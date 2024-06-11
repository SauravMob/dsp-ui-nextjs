
# DSP UI - NEXT.js

DSP, or a demand-side platform, is an advertising technology (AdTech) platform that allows advertisers to purchase and manage ad inventories from multiple ad sources through a single interface. This platform is designed for ease of use and efficiency in creating and running ad campaigns, monitoring performance, and exporting reports.

## Features

- **Creating Campaigns and Creatives**: Easily create and manage ad campaigns and their associated creatives.
- **Monitoring Reports**: Track all generated reports to analyze campaign performance.
- **Exporting Reports**: Export reports in CSV format for further analysis and record-keeping.

## Additional Benefits

**Server-Side Rendering (SSR) and Static Site Generation (SSG)**
   - Most of the HTML is rendered on the server side, reducing the load on the client side.
   - Improves performance and SEO as pages are pre-rendered on the server.

**TypeScript Integration**
   - Provides type safety, reducing the chances of runtime errors and improving code maintainability.

**Tailwind CSS**
   - Includes only the required CSS, making customization easier and more efficient.
   - Avoids unnecessary CSS overrides.

**Form Management with `react-hook-form` and Zod**
   - Utilizes hooks from `react-hook-form` for better form management.
   - Uses Zod for robust data validation, ensuring proper data handling.

**Reduced Unwanted Code**
   - Streamlined codebase by removing unnecessary code, making the project more maintainable and efficient.

**Enhanced Security with HTTP-only Cookies**
   - Stores user data in HTTP-only cookies instead of `localStorage`, offering enhanced security against XSS attacks.

**Reduced Use of Client-Side Hooks**
   - Since most data fetching is done server-side, there is less need for client-side hooks, reducing unnecessary rendering loads.

**Dependency Reduction**
   - Removed approximately 50% of dependencies, retaining only essential packages to keep the project lightweight.

**Custom Components with Radix UI**
   - Utilized Radix UI for custom component development, allowing easy future customization.
   - All components are made from scratch, enhancing flexibility.

**Real-time UI Testing**
  - Ability to test the UI with real-time data by building for production, ensuring no difference between development and production environments.

**URL-Based Filtering/Sorting/Pagination**
  - Filtering is done based on the URL so that on refresh, filters do not have to be manually changed again.

## Installation

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Screenshots

<div style="display: flex; flex-wrap: wrap; gap: 10px;">

  <img src="https://raw.githubusercontent.com/SauravMob/dsp-ui-nextjs/ui-changes/public/screenshots/Admin_dashboard.png?token=GHSAT0AAAAAACTO52H64BHZ7DW6KXHJ2NKEZTH4G6A" alt="Admin dashboard" width="48%">

  <img src="https://raw.githubusercontent.com/SauravMob/dsp-ui-nextjs/ui-changes/public/screenshots/Dashboard.png?token=GHSAT0AAAAAACTO52H7VIGYFS46SK272DIWZTH4HRA" alt="Dashboard" width="48%">

  <img src="https://raw.githubusercontent.com/SauravMob/dsp-ui-nextjs/ui-changes/public/screenshots/Campaign_section.png?token=GHSAT0AAAAAACTO52H6NKGF5H656RM3PFZKZTH4IAA" alt="Campaign" width="48%">

  <img src="https://raw.githubusercontent.com/SauravMob/dsp-ui-nextjs/ui-changes/public/screenshots/creative_section.png?token=GHSAT0AAAAAACTO52H72XS4GY43YS5LVDXGZTH4IQA" alt="Creative" width="48%">

  <img src="https://raw.githubusercontent.com/SauravMob/dsp-ui-nextjs/ui-changes/public/screenshots/Siteapp_report.png?token=GHSAT0AAAAAACTO52H6GL5OPUZBCUPRG726ZTH4JAA" alt="SiteApp Report" width="48%">

  <img src="https://raw.githubusercontent.com/SauravMob/dsp-ui-nextjs/ui-changes/public/screenshots/manage_user.png?token=GHSAT0AAAAAACTO52H6U64OF4D7SITXRJ5IZTH4JNQ" alt="Manage User" width="48%">

</div>
