# AKGU Videos Directory

This directory hosts local video assets for the Ajay Kumar Garg University web portal.

### Quick Setup: Adding Your Video
1. Place your video file here and name it **`campus-tour.mp4`** (or edit the path in `index.html` and `js/common.js`).
2. Recommended format:
   - **Format**: MP4 (H.264 video codec, AAC audio codec)
   - **Resolution**: 1080p (1920x1080) or 720p (1280x720)
   - **Compression**: Web-optimized / fast start enabled

### How the Combined Feature Works:
- **Hero Background Loop (Method 4)**: The video plays automatically in the background of the hero banner (muted and looped) with overlay text.
- **Ambient Controller**: Visitors can pause/resume or unmute the background video directly from the controller pill in the hero section.
- **Full Interactive Player (Method 3)**: Clicking **"Watch Campus Film"** or **"Tour in 4K"** launches a focused modal player with full HTML5 controls (scrubber, volume, play/pause, fullscreen, and crystal-clear audio).
- **Graceful Fallback**: If `campus-tour.mp4` is not yet present, the system automatically and seamlessly displays the 5 authentic campus photos without any errors!
