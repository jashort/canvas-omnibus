# Canvas Omnibus

*A minimalist mobile-friendly image browser*

Canvas Omnibus is designed to show pictures the same way you look through a coffee 
table photo book - just pick a directory and start turning "pages"!

## Features
  - Mobile friendly (tap anywhere in the middle or bottom of the screen 
    to move to the next picture, or in the top corners to go back)
  - Keyboard shortcuts
  - Eye-friendly dark theme


## Requirements
- A web server that can serve static files and directory listings, 
  such as Nginx or Apache

## Installation

### Nginx
- Download the latest release of Canvas Omnibus
- Extract these 
- Update Nginx configuration:
```
        location /pics {
                autoindex on;
        }
```


## Development

See [docs/development.md](docs/development.md) for more information.