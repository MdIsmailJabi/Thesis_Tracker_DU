# **App Name**: ThesisFlow

## Core Features:

- Role-Based Access Control: Secure access to different parts of the application based on user roles defined in Firebase Authentication (student, guide, co_guide, hod, registrar, vc, brs, research_admin).
- Thesis Submission: Students can submit their thesis with title, abstract, keywords, and file uploads. The system uploads the thesis documents to Firebase Storage, stores URLs in Firestore, and sets status to 'Submitted'.
- Progress Report Submission and Tracking: Enables students to submit progress reports periodically. Guides can review these reports.
- Multi-Stage Approval Workflow: Configurable approval stages for theses, routed to different roles (guide, HOD, registrar, etc.). Updates are logged in activity logs.
- Automated Email Notifications: Cloud Function triggers send email notifications upon thesis status updates (e.g., approval, rejection). Logs the emails in Firestore.
- Admin Panel: Dashboard for research admins to configure approval stages, manage roles, edit email templates, and view analytics.
- AI-powered content improvement Tool: An AI-powered tool assists students in refining their thesis abstracts and titles by suggesting improvements based on current academic trends.

## Style Guidelines:

- Primary color: Deep Blue (#3F51B5), representing trust and authority, in line with academic settings.
- Background color: Light Blue (#E8EAF6), a desaturated version of the primary color, providing a calm and professional backdrop.
- Accent color: Yellow-Amber (#FFC107), an analogous color that offers contrast for calls to action and important notifications.
- Body: 'PT Sans', a humanist sans-serif font, provides a modern and readable style suitable for body text.
- Headline: 'Playfair', a modern serif with geometric forms and high contrast between thick and thin strokes, conveying an elegant and fashionable feel; use for headers and short sections of text.
- Use clean and professional icons from a library like Font Awesome to represent different actions and statuses.
- Employ a clean, card-based layout with clear sections for different functionalities. Prioritize responsive design for accessibility across devices.
- Subtle transitions and animations to provide feedback on interactions and guide users through the workflow.