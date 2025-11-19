
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
- **Post creation and ediing** with rich metadata
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
