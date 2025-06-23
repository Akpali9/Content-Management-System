# CMS Pro - Modern Content Management System

A beautiful, modern Content Management System built with Next.js 14, featuring a stunning UI with dark/light theme support and comprehensive content management capabilities.

## ✨ Features

### 🎨 Beautiful Modern UI
- **Glass morphism design** with backdrop blur effects
- **Dark/Light theme switching** with system preference detection
- **Gradient backgrounds** and smooth animations
- **Responsive design** that works on all devices
- **Custom scrollbars** and hover effects

### 📝 Content Management
- **Post creation and editing** with rich metadata
- **Auto-slug generation** from post titles
- **Draft, review, and published** workflow
- **Tag and category management**
- **SEO-friendly URL slugs**

### 👥 User Management
- **Role-based permissions** (Admin, Editor, Author, Subscriber)
- **User creation with validation**
- **Account status management**
- **Password strength requirements**
- **Welcome email notifications**

### 📊 Dashboard Analytics
- **Real-time statistics** with beautiful cards
- **Recent posts overview**
- **Quick action shortcuts**
- **Visual data representation**

### 🔧 Technical Features
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Server Actions** for form handling
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **Form validation** and error handling

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/Akpali9/Content-management-system-/
   cd cms-pro
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

\`\`\`
cms-pro/
├── app/                    # Next.js App Router pages
│   ├── posts/             # Post management pages
│   ├── users/             # User management pages
│   ├── settings/          # Settings page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Dashboard page
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── dashboard-stats.tsx
│   ├── post-editor.tsx
│   ├── sidebar.tsx
│   ├── header.tsx
│   └── theme-toggle.tsx
├── actions/              # Server Actions
│   ├── posts.ts         # Post-related actions
│   └── users.ts         # User-related actions
├── lib/                 # Utility functions
│   └── utils.ts
└── package.json
\`\`\`

## 🎯 Usage

### Creating Posts

1. Navigate to **Posts** in the sidebar
2. Click **"New Post"** button
3. Fill in the post details:
   - Title (required)
   - Content (required)
   - Status (Draft/Review/Published)
   - URL slug (auto-generated)
   - Excerpt and tags
4. Click **"Save Post"** to create

### Managing Users

1. Go to **Users** section
2. Click **"Add User"** button
3. Enter user information:
   - Full name and email (required)
   - Secure password (min 6 characters)
   - Role selection with permissions
   - Account status (Active/Inactive)
4. Click **"Create User"** to add

### Theme Switching

- Click the **sun/moon icon** in the header to toggle between light and dark themes
- The system automatically detects your OS preference on first visit
- Theme preference is saved locally

## 🔐 User Roles & Permissions

| Role | Permissions |
|------|-------------|
| **Administrator** | Full system access, user management, settings |
| **Editor** | Create, edit, and publish all content |
| **Author** | Create and edit own content only |
| **Subscriber** | View content and leave comments |

## 🛠️ Customization

### Adding New Pages

1. Create a new file in the \`app/\` directory
2. Export a default React component
3. Add navigation link in \`components/sidebar.tsx\`

### Styling

The project uses Tailwind CSS with custom design tokens:

- **Colors**: Defined in \`globals.css\` with CSS custom properties
- **Components**: Located in \`components/ui/\` directory
- **Themes**: Managed by \`next-themes\` package

### Server Actions

Add new server actions in the \`actions/\` directory:

\`\`\`typescript
"use server"

export async function yourAction(formData: FormData) {
  // Your server-side logic here
}
\`\`\`

## 📦 Dependencies

### Core Dependencies
- **next**: React framework with App Router
- **react**: UI library
- **typescript**: Type safety
- **tailwindcss**: Utility-first CSS framework
- **next-themes**: Theme switching functionality

### UI Components
- **@radix-ui/\***: Accessible component primitives
- **lucide-react**: Beautiful icons
- **class-variance-authority**: Component variants
- **tailwind-merge**: Tailwind class merging

### Utilities
- **date-fns**: Date formatting and manipulation
- **clsx**: Conditional class names

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- **Netlify**
- **Railway**
- **DigitalOcean App Platform**
- **AWS Amplify**

Build the application:

\`\`\`bash
npm run build
npm start
\`\`\`

## 🔮 Future Enhancements

- [ ] **Database Integration** (Supabase/PostgreSQL)
- [ ] **Authentication System** (NextAuth.js)
- [ ] **File Upload** and media management
- [ ] **Rich Text Editor** (TipTap/Slate)
- [ ] **Email Notifications**
- [ ] **Advanced Analytics** with charts
- [ ] **Multi-language Support**
- [ ] **API Documentation**
- [ ] **Mobile App** (React Native)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Vercel** for hosting and deployment
- **shadcn** for the beautiful UI components
- **Tailwind CSS** for the utility-first approach
- **Radix UI** for accessible primitives

## 📞 Support

If you have any questions or need help, please:

- Open an issue on GitHub
- Check the [documentation](https://nextjs.org/docs)
- Join our [Discord community](https://discord.gg/nextjs)

---

**Built using Next.js 14 and modern web technologies**
