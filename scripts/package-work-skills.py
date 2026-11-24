#!/usr/bin/env python3
"""Build deterministic, one-skill ZIPs using only Python/Node standard libraries.

This is a repository maintenance tool. Users download its committed outputs;
Copilot/Gemini imports do not execute this script or require local runtimes.
"""

import argparse
import hashlib
import io
import json
from pathlib import Path
import subprocess
import sys
import zipfile


ROOT = Path(__file__).resolve().parents[1]


def sha256(data):
    return hashlib.sha256(data).hexdigest()


def make_zip(content):
    output = io.BytesIO()
    info = zipfile.ZipInfo("SKILL.md", date_time=(1980, 1, 1, 0, 0, 0))
    info.create_system = 3
    info.external_attr = 0o100644 << 16
    info.compress_type = zipfile.ZIP_DEFLATED
    with zipfile.ZipFile(output, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
        archive.writestr(info, content, compresslevel=9)
    return output.getvalue()


def build(output, check=False):
    result = subprocess.run(
        ["node", str(ROOT / "scripts/check-work-skills.mjs"), "--json"],
        cwd=ROOT, capture_output=True, text=True, check=True,
    )
    report = json.loads(result.stdout)
    files = {}
    packages = []
    for skill in report["skills"]:
        content = (ROOT / skill["sourcePath"]).read_bytes()
        if sha256(content) != skill["sha256"]:
            raise ValueError(f"{skill['name']}: source changed during packaging; run again")
        archive = make_zip(content)
        filename = skill["name"] + ".zip"
        files[filename] = archive
        packages.append({
            "name": skill["name"], "title": skill["title"], "group": skill["group"],
            "preferredHosts": skill["preferredHosts"], "sourcePath": skill["sourcePath"],
            "sourceSha256": skill["sha256"], "sourceBytes": len(content),
            "package": filename, "packageSha256": sha256(archive), "packageBytes": len(archive),
            "archiveEntries": ["SKILL.md"],
        })
    manifest = {
        "schemaVersion": 1, "packVersion": report["packVersion"],
        "reviewedOn": report["reviewedOn"], "sourceRepository": report["sourceRepository"],
        "profile": report["profile"],
        "validation": "Source structure and archive contents checked; work-account import and task execution unverified.",
        "packages": packages,
    }
    files["manifest.json"] = (json.dumps(manifest, ensure_ascii=False, indent=2) + "\n").encode("utf-8")
    if check:
        mismatches = [name for name, content in files.items() if not (output / name).is_file() or (output / name).read_bytes() != content]
        extras = sorted(path.name for path in output.iterdir() if path.name not in files) if output.is_dir() else []
        if mismatches or extras:
            raise ValueError(f"Packages are stale, missing, or unexpected. Rebuild with npm run skills:package. Differences: {', '.join(mismatches + extras)}")
        print(f"Verified {len(packages)} committed packages against their source hashes and deterministic ZIP contents.")
        return
    output.mkdir(parents=True, exist_ok=True)
    extras = sorted(path.name for path in output.iterdir() if path.name not in files)
    if extras:
        raise ValueError(f"Unexpected output files preserved: {', '.join(extras)}. Review them before rebuilding.")
    for name, content in files.items():
        (output / name).write_bytes(content)
    print(f"Built {len(packages)} individual skill ZIPs and manifest in {output}.")
    print("Upload one ZIP or its source SKILL.md at a time; no developer software is needed on the work PC.")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=ROOT / "packages/work-pc")
    parser.add_argument("--check", action="store_true", help="verify committed outputs without changing files")
    args = parser.parse_args()
    try:
        build(args.output.resolve(), args.check)
    except subprocess.CalledProcessError as error:
        print(error.stderr.strip() or "Skill source validation failed", file=sys.stderr)
        return 1
    except (OSError, ValueError, KeyError) as error:
        print(str(error), file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
