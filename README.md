# ArgoCD JS SDK

A JavaScript SDK for interacting with the ArgoCD API. This SDK provides a simple and intuitive way to manage your ArgoCD resources programmatically.

## Features

- Full coverage of ArgoCD API endpoints
- Type-safe API calls
- Promise-based interface
- Easy to use and extend
- Built-in error handling

## Installation

```bash
npm install argocd-js-sdk
```

## Usage

```javascript
import { ArgoCD } from 'argocd-js-sdk';

// Initialize the client
const client = new ArgoCD({
  baseUrl: 'https://your-argocd-server.com',
  token: 'your-auth-token'
});

// List applications
const applications = await client.application.listApplications();

// Create a new application
const newApp = await client.application.createApplication({
  metadata: {
    name: 'my-app'
  },
  spec: {
    project: 'default',
    source: {
      repoURL: 'https://github.com/example/repo.git',
      path: 'kustomize/overlays/dev',
      targetRevision: 'HEAD'
    },
    destination: {
      server: 'https://kubernetes.default.svc',
      namespace: 'default'
    }
  }
});

// Sync an application
await client.application.syncApplication('my-app');
```

## API Services

The SDK provides the following services:

- `AccountService`: Manage ArgoCD accounts
- `ApplicationService`: Manage applications
- `CertificateService`: Manage repository certificates
- `ClusterService`: Manage clusters
- `GPGKeyService`: Manage GPG keys
- `NotificationService`: Manage notifications
- `ProjectService`: Manage projects
- `RepositoryService`: Manage repositories
- `SessionService`: Manage sessions
- `SettingsService`: Get ArgoCD settings
- `UserService`: Manage users
- `VersionService`: Get ArgoCD version

## Authentication

The SDK supports token-based authentication. You can get your token from the ArgoCD UI:

1. Log in to your ArgoCD instance
2. Click on your username in the top right
3. Select "User Info"
4. Click "Generate New Token"

## Error Handling

The SDK throws custom errors for different scenarios:

```javascript
try {
  await client.application.getApplication('non-existent-app');
} catch (error) {
  if (error.status === 404) {
    console.log('Application not found');
  } else {
    console.error('An error occurred:', error.message);
  }
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run tests:
   ```bash
   npm test
   ```
4. Build the project:
   ```bash
   npm run build
   ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please open an issue in the GitHub repository.

## Versioning

This project uses [Semantic Versioning](http://semver.org/). For the versions available, see the [tags on this repository](https://github.com/yourusername/argocd-js-sdk/tags). 