# DevOps Final App - Frontend (Green Team)

A modern React-based frontend application built with Material-UI for a comprehensive web application with user authentication, board management, messaging, and user profile features.

## 🚀 Features

- **User Authentication**: Login and signup functionality
- **Board Management**: Create, read, update, and delete board posts
- **User Profile**: Personal page with user information
- **Messaging System**: Internal messaging functionality
- **Responsive Design**: Built with Material-UI for modern, responsive UI
- **Docker Support**: Containerized deployment with Nginx
- **CI/CD Pipeline**: Automated build and deployment with GitHub Actions

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3.1
- **UI Library**: Material-UI (MUI) v6.1.3
- **Routing**: React Router DOM v6.26.2
- **HTTP Client**: Axios v1.7.7
- **AI Integration**: OpenAI v4.67.3
- **Build Tool**: Create React App
- **Container**: Docker with Nginx
- **CI/CD**: GitHub Actions with AWS ECR

## 📁 Project Structure

```
src/
├── assets/           # Static assets
├── containers/       # Main App component
├── pages/           # Page components
│   ├── board/       # Board management pages
│   ├── login/       # Authentication pages
│   ├── message/     # Messaging functionality
│   ├── mypage/      # User profile pages
│   └── signup/      # User registration
├── router/          # Routing configuration
├── setupProxy.js    # Development proxy configuration
└── index.js         # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js 14 or higher
- npm or yarn
- Docker (for containerized deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/kwohyuno/devops-final-app-repo-frontend-green.git
   cd devops-final-app-repo-frontend-green
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000`

4. **Run tests**
   ```bash
   npm test
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🐳 Docker Deployment

### Build Docker Image
```bash
docker build -t frontend-app .
```

### Run Docker Container
```bash
docker run -p 80:80 frontend-app
```

The application will be available at `http://localhost:80`

## 🔧 Configuration

### Environment Setup

The application uses proxy configuration for development:

- **API Endpoint**: `http://localhost:8080` (via `/api` route)
- **Signup API**: `http://localhost:8081` (via `/api2` route)

### Nginx Configuration

The production deployment uses Nginx with the following configuration:
- Serves static files from `/usr/share/nginx/html`
- Proxies API requests to backend services
- Handles CORS headers
- Supports SPA routing with fallback to `index.html`

## 🔄 CI/CD Pipeline

The project includes GitHub Actions workflow for automated deployment:

- **Trigger**: Push to `main` branch
- **Build**: Docker image build
- **Deploy**: Push to AWS ECR
- **Environment**: AWS ECR with ECS deployment

### Required Secrets

The following secrets must be configured in GitHub:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_SESSION_TOKEN`
- `AWS_ECR_URL`

## 📱 Application Routes

- `/` - Login page (default)
- `/login` - User authentication
- `/signup` - User registration
- `/board` - Board listing
- `/board/form` - Create new board post
- `/board/detail/:boardId` - View board post details
- `/board/updateform/:boardId` - Edit board post
- `/mypage` - User profile page
- `/message` - Messaging system

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm test -- --watch
```

## 📦 Build

Create a production build:
```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of the DevOps Final Application repository.

## 👥 Team

Green Team - DevOps Final Project

## 🔗 Related Repositories

- Backend API services (referenced in proxy configuration)
- Infrastructure and deployment configurations

---

For more information about the project structure and deployment, please refer to the individual component documentation.
