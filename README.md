# Kinetic — Luxury Clothing & Fashion E-Commerce Platform

A full-featured, high-fidelity e-commerce platform for a luxury clothing and fashion retailer, built with React 19, TypeScript, and Vite.

## Categories & Catalog Taxonomy

- **Kids**: Certified organic cotton sets, cozy outerwear & activewear for toddlers & children
- **Teens**: Streetwear hoodies, vintage graphic tees & utility cargos for young trendsetters
- **Men**: Tailored oxford shirts, organic indigo denim, wool bomber outerwear & athletic wear
- **Women**: Mulberry silk dresses, cashmere knitwear, high-rise raw denim & linen collections

## Strict Photography Guidelines

All product photography adheres strictly to a **clothing-only catalog**:
- Ghost mannequin displays
- Flat-lay clothing compositions
- Clothing-only product renders and apparel hanger displays
- **Zero visible human faces or human body interaction anywhere in the application**

## Stack

- React 19 + TypeScript + Vite
- React Router v7 (client-side routing)
- Tailwind CSS v4 (custom design tokens in `src/index.css`)
- Recharts (admin analytics charts)
- lucide-react (icons)
- Mock/in-memory data persisted to `localStorage` under `kinetic_clothing_v2`

## Getting Started

```bash
npm install
npm run dev       # Start local dev server (http://localhost:5173)
npm run build     # Production build -> dist/
npm run preview   # Preview production build locally
```

## Features & Modules

**Storefront:** Home (Hero, category grid, curated fashion selections), Product Listing (Kids, Teens, Men, Women), Search with History, Product Detail (Image gallery, size selector, size guide, fabric specs, care instructions, reviews), Cart, Checkout, Order Confirmation & Tracking, Wishlist, Notifications.

**Admin Console (`/admin`):** Dashboard, Analytics (revenue & category breakdowns), Product Management (Add/Edit/Delete with clothing fields: Size, Color, Fabric, Gender, Age Group, Care Instructions), Category Management, Inventory Control, Order Processing, Customers, Coupons, Reviews, Notification Broadcast, Store Settings.
