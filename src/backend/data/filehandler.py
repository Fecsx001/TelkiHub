import os
import json
import datetime
from typing import Any

JSON_FILE_PATH = os.path.join(os.path.dirname(__file__), "data.json")


def _load_json() -> dict[str, Any]:
    with open(JSON_FILE_PATH, "r", encoding="utf-8") as file:
        return json.load(file)


def _save_json(data: dict[str, Any]) -> None:
    with open(JSON_FILE_PATH, "w", encoding="utf-8") as file:
        json.dump(data, file, indent=2, ensure_ascii=False)


def _parse_datetime_string(date_string: str) -> datetime.datetime:
    """Parse a datetime string in ISO format to datetime object"""
    return datetime.datetime.fromisoformat(date_string)


def get_relevan():
    data = _load_json()
    re = {"high": [], "normal": []}
    current_time = datetime.datetime.now()

    if isinstance(data.get("high"), list):
        for high in data["high"]:
            if "relevant_until" in high:
                relevant_until = _parse_datetime_string(high["relevant_until"])
                if current_time < relevant_until:
                    re["high"].append(high)

    if isinstance(data.get("normal"), list):
        for normal in data["normal"]:
            if "relevant_until" in normal:
                relevant_until = _parse_datetime_string(normal["relevant_until"])
                if current_time < relevant_until:
                    re["normal"].append(normal)

    return re


def add_item(prio: str, title: str, text: str, relevant_until: str):
    data = _load_json()
    if prio == "high":
        data["high"].append(
            {
                "id": (data["high"][-1]["id"] + 1),
                "title": title,
                "text": text,
                "uploaded": datetime.datetime.now().strftime("%Y%m%dT%H%M%S"),
                "relevant_until": relevant_until,
            }
        )
    else:
        data["normal"].append(
            {
                "id": (data["normal"][-1]["id"] + 1),
                "title": title,
                "text": text,
                "uploaded": datetime.datetime.now().strftime("%Y%m%dT%H%M%S"),
                "relevant_until": relevant_until,
            }
        )
    _save_json(data)


if __name__ == "__main__":
    add_item(
        "normal",
        "almafa",
        "almafa almafa\nalmafa",
        relevant_until="2024-10-10T00:00:00",
    )
