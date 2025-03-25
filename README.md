# DiscoDiscord

Discord Colored Text Generator is a web application that lets you create custom colored and formatted text for Discord using ANSI color codes. It enables you to style your text with foreground and background colors, as well as formatting options like bold and underline.

## Features

- **Custom Coloring:** Choose from a set of predefined foreground ([`fgColors`](frontend/app/components/DiscordTextGenerator.tsx)) and background ([`bgColors`](frontend/app/components/DiscordTextGenerator.tsx)) colors.
- **Text Styling:** Easily apply bold and underline styles.
- **Rainbow Text:** Automatically apply a repeating sequence of rainbow colors to any selected text.
- **Templates & Examples:** Load example text snippets or create a pre-styled colored sample.
- **Live Editor:** A content editable area which strips HTML formatting on paste.
- **ANSI Conversion:** Convert selected text into ANSI formatted string for use in Discord.
- **Theme Switcher:** Toggle between light and dark modes with persistence using localStorage.
- **Copy with Feedback:** Copy the ANSI formatted text to clipboard with fun copy status messages.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Steps

1. **Clone the Repository:**

    ```sh
    git clone https://github.com/aayushker/DiscoDiscord.git
    cd DiscoDiscord
    ```

2. **Install Dependencies:**

    The project contains a separate frontend directory. Install dependencies by running:
    
    ```sh
    cd frontend
    npm install
    ```

3. **Run the Development Server:**

    Start the server in development mode:
    
    ```sh
    npm run dev
    ```
    
    This will launch the application. Open http://localhost:3000 to view it in your browser.

## Project Structure

- **frontend/app/components/DiscordTextGenerator.tsx**  
  This component implements most of the functionalities of the application including applying styles, handling copy actions, and converting HTML content to ANSI codes.

- **frontend/app/components/ClientProviders.tsx**  
  Sets up client-side providers and loads the user's theme preference from localStorage.

- **frontend/app/layout.tsx**  
  Defines the root layout for the application including Mantine theme configurations.

- **Other Files:**  
  Additional configuration, CSS, and TypeScript files are included in the project for a seamless experience.

## Usage

### Creating Styled Text:

- Use the editor area to type your text.
- Select a portion of text and click one of the style buttons (Bold, Underline, Foreground or Background color) to apply a style.
- Use the "Rainbow Text" button to apply a rainbow color cycle to the selected text.

### Templates:

- Access example texts or a colored example using the "Templates" menu.
- Clicking on a template will load its content into the editor.

### Copying ANSI Formatted Text:

- After styling your text, click the copy button to convert it to an ANSI formatted string and copy it to your clipboard.
- Paste directly into Discord to see the formatted output.

### Reset:

- Use the "Reset All" or "Reset Text" buttons to clear applied formatting and restore the basic text.

## Customization

### Theme:
Toggle between light and dark modes using the built-in switch. The theme preference is saved in localStorage for persistence (ClientProviders).

### Color Palettes:
Modify foreground or background color arrays (fgColors and bgColors) to customize the available styles.

### ANSI Conversion:
The function that converts HTML nodes to ANSI escape sequences is located in DiscordTextGenerator.tsx.

## Contributing
Contributions are welcome! Please follow standard GitHub workflows for issues and pull requests.

## License
This project is licensed under the MIT License.

For more details, please refer to the source files:

- DiscordTextGenerator.tsx
- ClientProviders.tsx
- layout.tsx