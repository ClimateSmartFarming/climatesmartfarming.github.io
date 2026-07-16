"""
CSF Resource Image Finder

This script searches your image folders for the required resource images
and copies them to a separate folder.

Usage:
    1. Update SEARCH_FOLDERS to point to your image folders
    2. Update OUTPUT_FOLDER to where you want the images copied
    3. Run: python find_resource_images.py
"""

import os
import shutil
from pathlib import Path

# ============================================================
# CONFIGURE THESE PATHS
# ============================================================

# Folders to search for images (add as many as needed)
SEARCH_FOLDERS = [

    r"C:\Users\Admin\Pictures",

    # Add more folders here...
]

# Where to copy found images
OUTPUT_FOLDER = r"C:\Users\Admin\Documents\CSF-React\public\images\resources"

# ============================================================
# REQUIRED IMAGES
# ============================================================

REQUIRED_IMAGES = [
    "Building-Soils-for-Better-Crops-4-cover-284x330-1.jpg",
    "F1-6RRyWYAUL9-s-240x135.jpg",
    "NYC_WATERSHED_110118.00_00_34_17.Still013-800x450-1-1024x501.jpg",
    "On-Farm-Vulnerabilites-32.png",
    "Screenshot-2023-12-06-152025-1024x781.png",
    "Screenshot-2023-12-06-153857.png",
    "Screenshot-2023-12-06-154253.png",
    "Screenshot-2023-12-06-155437.png",
    "Screenshot-2023-12-06-160115.png",
    "Screenshot-2023-12-06-163128.png",
    "Screenshot-2023-12-06-163649.png",
    "Screenshot-2023-12-08-134034.png",
    "Screenshot-2023-12-08-134533.png",
    "Screenshot-2023-12-08-140150.png",
    "Screenshot-2023-12-08-142250.png",
    "Screenshot-2023-12-08-142936.png",
    "Screenshot-2023-12-08-143728.png",
    "Screenshot-2023-12-08-152538.png",
    "Screenshot-2023-12-08-154846.png",
    "Screenshot-2023-12-08-155928.png",
    "Screenshot-2023-12-12-160930.png",
    "Screenshot-2023-12-12-165357.png",
    "Screenshot-2024-01-09-153947.png",
    "Screenshot-2024-01-24-114124.png",
    "Screenshot-2024-01-24-114517.png",
    "Screenshot-2024-01-24-115115.png",
    "Screenshot-2024-01-24-115703.png",
    "Screenshot-2024-01-24-120045.png",
    "Screenshot-2024-01-24-130151.png",
    "Screenshot-2024-01-24-131532.png",
    "Screenshot-2024-01-24-131851.png",
    "Screenshot-2024-01-24-132442.png",
    "Screenshot-2024-01-24-133540.png",
    "Screenshot-2024-01-24-134717-240x240.png",
    "Screenshot-2024-01-24-140146.png",
    "Screenshot-2024-01-24-141311.png",
    "Screenshot-2024-01-26-145642.png",
    "Screenshot-2024-01-26-150232.png",
    "Screenshot-2024-01-26-151213.png",
    "Screenshot-2024-01-26-151625.png",
    "Screenshot-2024-01-26-151959.png",
    "Untitled-design-25.png",
    "Untitled-design-26.png",
    "download-1-1-240x85.png",
    "ny-crf.png",
    "pexels-dariusz-grosa-2332736-scaled.jpg",
    "pexels-dodo-phanthamaly-916406-scaled.jpg",
    "pexels-jan-kroon-1000057-scaled.jpg",
    "pexels-jonathan-petersson-1297307-scaled.jpg",
    "pexels-matthias-zomer-422218-1-scaled.jpg",
    "pexels-matthias-zomer-422218-2-scaled.jpg",
    "pexels-melle-9663310-scaled.jpg",
    "pexels-photomix-company-1002703-scaled.jpg",
    "pexels-rodrigo-souza-2531602-scaled.jpg",
    "pexels-seb-360013-240x160.jpg",
    "pexels-singkham-1108572-scaled.jpg",
    "pexels-tom-fisk-9893729-scaled.jpg",
]

# ============================================================
# SCRIPT
# ============================================================

def find_images():
    """Search folders for required images and copy to output folder."""
    
    # Create output folder if it doesn't exist
    os.makedirs(OUTPUT_FOLDER, exist_ok=True)
    
    # Track results
    found = {}
    not_found = set(REQUIRED_IMAGES)
    
    # Build index of all files in search folders
    print("=" * 60)
    print("Scanning folders for images...")
    print("=" * 60)
    
    file_index = {}  # filename -> full path
    
    for folder in SEARCH_FOLDERS:
        if not os.path.exists(folder):
            print(f"⚠️  Folder not found: {folder}")
            continue
            
        print(f"Scanning: {folder}")
        
        for root, dirs, files in os.walk(folder):
            for filename in files:
                full_path = os.path.join(root, filename)
                # Store by exact filename
                file_index[filename] = full_path
                # Also store lowercase version for case-insensitive matching
                file_index[filename.lower()] = full_path
    
    print(f"\nIndexed {len(file_index) // 2} files")
    print()
    
    # Search for each required image
    print("=" * 60)
    print("Searching for required images...")
    print("=" * 60)
    
    for image_name in REQUIRED_IMAGES:
        # Try exact match first
        if image_name in file_index:
            found[image_name] = file_index[image_name]
            not_found.discard(image_name)
        # Try case-insensitive match
        elif image_name.lower() in file_index:
            found[image_name] = file_index[image_name.lower()]
            not_found.discard(image_name)
    
    # Copy found images
    print()
    print("=" * 60)
    print("Copying images...")
    print("=" * 60)
    
    for image_name, source_path in found.items():
        dest_path = os.path.join(OUTPUT_FOLDER, image_name)
        try:
            shutil.copy2(source_path, dest_path)
            print(f"✅ {image_name}")
        except Exception as e:
            print(f"❌ {image_name} - Error: {e}")
            not_found.add(image_name)
    
    # Summary
    print()
    print("=" * 60)
    print("SUMMARY")
    print("=" * 60)
    print(f"✅ Found and copied: {len(found)}")
    print(f"❌ Not found: {len(not_found)}")
    
    if not_found:
        print()
        print("Missing images:")
        for name in sorted(not_found):
            print(f"   - {name}")
    
    print()
    print(f"Output folder: {OUTPUT_FOLDER}")
    
    return found, not_found


if __name__ == "__main__":
    find_images()
