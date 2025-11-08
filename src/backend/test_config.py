#!/usr/bin/env python3
"""
Simple test script to verify environment variables are loaded correctly
"""
import os
import sys

# Add current directory to Python path
sys.path.append(".")

try:
    from config import TOMTOM_API_KEY

    print(f"✅ Config loaded successfully!")
    print(f"✅ TOMTOM_API_KEY found: {TOMTOM_API_KEY[:10]}...")

    if TOMTOM_API_KEY:
        print("✅ API key is properly configured")
    else:
        print("❌ API key is empty or None")

except ImportError as e:
    print(f"❌ Failed to import config: {e}")
except ValueError as e:
    print(f"❌ Configuration error: {e}")
except Exception as e:
    print(f"❌ Unexpected error: {e}")

# Also check .env file directly
print(f"\n--- Checking .env file ---")
if os.path.exists(".env"):
    print("✅ .env file exists")
    with open(".env", "r") as f:
        content = f.read()
        if "TOMTOM_API_KEY" in content:
            print("✅ TOMTOM_API_KEY found in .env file")
        else:
            print("❌ TOMTOM_API_KEY not found in .env file")
else:
    print("❌ .env file not found")
