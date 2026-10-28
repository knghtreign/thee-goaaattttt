# Dr. Deepal's Dental Clinic

A modern, responsive web application for Dr. Deepal Shah's Dental Clinic in Malabar Hill, Mumbai. Built with React, TypeScript, Tailwind CSS, Express, and Google GenAI.

## Features

- **Interactive Before & After Smile Slider**: Visual transformation comparison with fluid drag handle.
- **AI Smile Simulator**: Generates dental aesthetic smile makeover visual previews using Gemini.
- **Smart Appointment Booking**: Real-time consultation booking with date/time pickers and WhatsApp integration.
- **Treatment Journey**: Interactive step-by-step patient pathway from consultation to treatment.
- **Services Catalog**: Comprehensive list of dental services with detailed procedural overviews.
- **Patient Testimonials & Reviews**: Real Google Maps reviews from verified patients.
- **Google Maps Grounding & Transit Guide**: Integrated directions and landmark navigation.

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion, Lucide React
- **Backend / API**: Express, Node.js, Tsx
- **AI Integration**: `@google/genai` (Gemini Flash, Thinking, and Image models)
- **Bundler**: Vite

## Getting Started

### Prerequisites

- Node.js 18+ or 20+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>

# Install dependencies
npm install
```

### Environment Setup

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Set your Gemini API key:
```env
GEMINI_API_KEY="your-gemini-api-key"
```

### Development

```bash
npm run dev
```

The application will run on `http://localhost:3000`.

### Type Checking & Building

```bash
# Type check TypeScript
npm run typecheck

# Production build
npm run build

# Start production server
npm run start
```

## License

MIT
