PRD — Portfolio CMS + Global 3D Neon Experience

1. Project Overview

Enhance the existing portfolio of Dilfu Altaf Athaya Rifi with:

A complete Admin Dashboard / CMS for managing the entire portfolio.

A persistent, global Three.js visual experience spanning the whole public portfolio.

Smooth scrolling and scroll-driven 3D transformations.

Supabase as the database, authentication, and storage layer.

The existing public portfolio is already designed and implemented.

CRITICAL RULE

Do NOT redesign or replace the existing public portfolio.

Preserve:

Existing Bento Grid

Existing navbar

Existing typography

Existing spacing

Existing dark mode

Existing light mode

Existing responsive layout

Existing sections

Existing UI components

Existing content structure

Existing visual identity

The new 3D experience is an enhancement layer behind the existing UI.

2. Core Concept

The portfolio should NOT use a simple Hero-only 3D orb.

Instead, create one persistent global Three.js environment that remains visible throughout the public portfolio and continuously transforms based on scroll progress.

The experience should feel like a futuristic:

Neon Liquid / Energy Flow System

The 3D scene should visually evolve as the user scrolls.

Concept:

                    GLOBAL 3D SCENE
                           │
                           │
             ┌─────────────┴─────────────┐
             │                           │
             │     Public Portfolio      │
             │                           │
             │        HERO               │
             │          ↓                │
             │        ABOUT              │
             │          ↓                │
             │        SKILLS             │
             │          ↓                │
             │       PROJECTS            │
             │          ↓                │
             │      EXPERIENCE           │
             │          ↓                │
             │       CONTACT             │
             │                           │
             └───────────────────────────┘

The 3D scene remains behind the content and changes continuously.

3. What Must Be Removed

Remove the previous concept:

Hero-only Floating Energy Orb

Also permanently remove the old horizontal full-name animation:

DILFU ALTAF ATHAYA RIFI
←──────────────────────→

Do not implement both.

The full name remains normal text in the Hero/Profile.

4. Global Three.js Architecture

Use one global Three.js Canvas, not a separate Canvas for every section.

Recommended architecture:

Public Page
│
├── Fixed Global 3D Canvas
│
├── Hero
├── About
├── Skills
├── Projects
├── Experience
└── Contact

The Canvas should be:

position: fixed
inset: 0
pointer-events: none
z-index: background layer

The existing portfolio content stays above it.

Do not allow the 3D scene to block:

Buttons

Links

Forms

Navigation

Cards

Text selection

5. Animation Stack

Use the following stack:

Next.js
   │
   ├── React Three Fiber
   │      └── Three.js
   │
   ├── GSAP
   │      └── ScrollTrigger
   │
   ├── Lenis
   │      └── Smooth scrolling
   │
   └── Framer Motion
          └── Normal UI animations

Responsibility

Lenis

Responsible for:

Smooth scrolling

Scroll interpolation

Consistent scroll velocity

GSAP + ScrollTrigger

Responsible for:

Scroll progress

Section-based transitions

3D transformation timelines

Camera/object movement

Morphing between visual states

React Three Fiber / Three.js

Responsible for:

3D geometry

Materials

Particles

Lighting

Liquid/energy effects

Rendering

Framer Motion

Continue using it for normal UI interactions such as:

Card hover

Buttons

Modals

Mobile navigation

Small UI transitions

Do not use multiple libraries for the exact same animation unnecessarily.

6. Global Scroll System

Create one normalized scroll progress value:

0.00 → 1.00

Example:

0.00 ───────── Hero
0.20 ───────── About
0.40 ───────── Skills
0.60 ───────── Projects
0.80 ───────── Experience
1.00 ───────── Contact

The Three.js scene responds continuously to this value.

Do NOT abruptly switch between completely separate scenes.

Transitions must be interpolated.

7. Visual State System

The 3D environment should have several visual states.

State 1 — HERO

Visual

Neon Energy Flow

Use:

Flowing curves

Soft glowing particles

Liquid-like geometry

Subtle distortion

Thin neon trails

Soft light

The scene should feel like energy flowing through space.

Avoid a basic static sphere.

8. State 2 — ABOUT

As the user scrolls toward About:

The Hero energy begins to distort and transform into:

Neon Liquid

Visual characteristics:

Fluid movement

Organic deformation

Slow wave motion

Glowing edges

Transparent/glass-like material

Subtle particles

Transition:

Energy Flow
     ↓
Distortion
     ↓
Liquid Form

The transition must be smooth.

9. State 3 — SKILLS

As the user reaches Skills:

Transform the liquid system into:

Neon Orbital Rings

Use:

Multiple rings

Different rotation speeds

Small particles

Orbital trails

Subtle glow

Concept:

       ╲       ╱
        ╲  ◉  ╱
         ╲   ╱
       ───╳───
         ╱   ╲
        ╱     ╲

The rings should subtly react to scroll progress.

Do not create a generic spinning planet.

10. State 4 — PROJECTS

As the user reaches Projects:

Transform the rings into:

Neon Particle Field

Particles should:

Float in 3D space

Move slowly

Form abstract structures

React subtly to scroll

Maintain depth

Possible visual:

✦      ·       ✦
    ·       ·
  ✦    ·  ✦
      ·
✦          ·

The field should remain abstract and elegant.

It must not obscure project cards.

11. State 5 — EXPERIENCE

Transform the particle field into:

Neon Energy Trails

Use:

Curved lines

Flowing trails

Light streaks

Directional motion

The trails should visually communicate:

progress → movement → growth

Keep them subtle.

12. State 6 — CONTACT

As the user reaches Contact:

Condense the scene into:

Neon Energy Core

The energy trails and particles slowly converge into a compact glowing structure.

Concept:

     ·
   · ◉ ·
     ·

The final state should feel calm and minimal.

13. Continuous Morphing

The states are conceptual references, not six completely independent scenes.

Prefer reusing shared:

Particles

Curves

Geometry

Materials

Uniforms

where practical.

Use interpolation:

stateA → stateB

rather than:

destroy stateA
create stateB

This prevents visible jumps.

14. Mouse Interaction

The global scene can respond subtly to mouse movement.

Example:

Mouse X → slight camera/object rotation
Mouse Y → slight camera/object rotation

Use damping.

The effect should be subtle enough that users barely notice the implementation.

Do not make the entire scene chase the cursor.

15. Scroll Interaction

Scroll should control:

Rotation

Position

Scale

Distortion

Particle density

Curve shape

Camera movement

Material intensity

Example:

Scroll down
    ↓
Energy accelerates slightly
    ↓
Geometry distorts
    ↓
Shape transforms
    ↓
New visual state

All transitions must be smooth.

16. Smooth Scrolling

Use Lenis for the public page.

The implementation must correctly integrate:

Lenis
+
GSAP ScrollTrigger

Do not create competing scroll systems.

Avoid:

Native scroll listeners running expensive logic every frame

Multiple animation loops

Multiple ScrollTrigger instances controlling the same property

Unnecessary React state updates during scrolling

17. Dark Mode

Dark mode should use:

Background:
#09090B

Primary neon:
Emerald

Secondary:
Subtle green/white glow

The 3D scene should blend into the black background.

Avoid excessive brightness.

18. Light Mode

Light mode should use:

Background:
#FFFFFF

Primary neon:
Electric / Soft Blue

Secondary:
Subtle cyan/blue glow

The effect should remain visible without becoming visually aggressive.

19. Responsive Behavior

Desktop:

Full visual experience

More particles

Full 3D detail

Stronger interaction

Tablet:

Reduced particle count

Reduced distortion

Reduced movement

Mobile:

Simplified geometry

Low particle count

Minimal mouse-related behavior

Reduced effects

Preserve readability

The public UI always has priority over the 3D scene.

20. Performance Requirements

The global 3D scene must be optimized.

Requirements:

Use a single Canvas.

Avoid creating/destroying objects on every scroll.

Reuse geometry and materials.

Limit particle count.

Use instancing where appropriate.

Avoid unnecessary post-processing.

Avoid large textures.

Avoid expensive shadows.

Use a reasonable DPR.

Lazy-load Three.js when appropriate.

Reduce quality on mobile/low-power devices.

Do not claim performance optimization solely because dpr={[1,2]} is used.

Performance should be evaluated from:

Geometry complexity

Particle count

Draw calls

Material complexity

DPR

Animation loop

Mobile GPU load

21. Reduced Motion

Respect:

prefers-reduced-motion

When enabled:

Reduce or disable smooth scrolling enhancements.

Minimize 3D movement.

Disable aggressive morphing.

Keep a static or very gently animated background.

Keep all content accessible.

22. Component Structure

Recommended:

components/
├── three/
│   ├── GlobalScene.tsx
│   ├── SceneController.tsx
│   ├── NeonLiquid.tsx
│   ├── EnergyFlow.tsx
│   ├── OrbitalRings.tsx
│   ├── ParticleField.tsx
│   └── EnergyTrails.tsx
│
├── portfolio/
├── admin/
└── ui/

Do not put the entire Three.js implementation into one huge component.

Keep visual systems modular.

23. Scene Controller

Create a controller responsible for mapping scroll progress to visual parameters.

Example conceptual API:

scrollProgress
      ↓
SceneController
      ↓
energyIntensity
liquidDistortion
ringRotation
particleSpread
trailSpeed
coreScale

The controller should interpolate values smoothly.

24. Existing Portfolio Preservation

The 3D scene must NOT change:

Bento Grid

Navbar

Typography

Section ordering

Existing cards

Existing copy

Existing buttons

Existing responsive layout

Existing color identity

The 3D layer sits behind the current portfolio.

If a conflict occurs:

Existing portfolio UI wins.

25. Admin CMS

The Admin Dashboard manages the entire portfolio, not just projects.

Routes:

/admin
/admin/login
/admin/profile
/admin/hero
/admin/skills
/admin/projects
/admin/experience
/admin/certificates
/admin/socials
/admin/messages

Sidebar:

Dashboard
Profile
Hero
Skills
Projects
Experience
Certificates
Social Links
Messages
Logout

26. Profile Management

Fields:

Full Name
Display Name
Profile Photo
Location
Education
Current Focus
Short Bio
Long Bio
CV / Resume

Do not invent personal information.

27. Hero Management

Fields:

Greeting
Display Name
Job Title
Description
Primary CTA Text
Primary CTA Link
Secondary CTA Text
Secondary CTA Link

Do not store Three.js animation logic in Supabase.

28. Skills Management

CRUD:

Create

Read

Update

Delete

Fields:

Name
Icon / Logo
Level
Description
Display Order
Published

Levels:

Beginner
Intermediate
Advanced
Expert

Initial fallback:

Next.js — Expert
React — Advanced
TypeScript — Advanced
JavaScript — Advanced
Tailwind CSS — Expert
NestJS — Intermediate
Vue.js — Intermediate
Flutter — Beginner

29. Projects Management

Fields:

Title
Slug
Short Description
Long Description
Thumbnail
Technologies
GitHub URL
Live Demo URL
Featured
Published
Display Order

Storage bucket:

project-images

30. Experience Management

Fields:

Role
Company
Start Date
End Date
Current
Description
Technologies
Display Order
Published

31. Certificates Management

Fields:

Title
Issuer
Issue Date
Credential URL
Image
Display Order
Published

Storage bucket:

certificate-images

32. Social Links Management

Fields:

Platform
Label
URL
Icon
Display Order
Published

Possible:

GitHub
LinkedIn
Email
WhatsApp
Instagram

Never invent links.

33. CV Management

Allow PDF upload/replace.

Storage bucket:

documents

Show Download CV only if a CV exists.

34. Contact Messages

Admin can:

View

Mark read

Mark unread

Delete

Filters:

All
Read
Unread

Sort newest first.

35. Supabase Database

Tables:

profiles
hero
skills
projects
experiences
certificates
social_links
contact_messages

Use the existing Supabase architecture where possible.

Do not create an unnecessary separate backend.

36. Authentication

Use Supabase Auth.

No public registration.

/admin/login
      ↓
Supabase Auth
      ↓
/admin

Authentication is not sufficient by itself.

Use secure admin authorization.

Never expose:

SUPABASE_SERVICE_ROLE_KEY

to the client.

37. Row Level Security

Enable RLS.

Public:

SELECT published portfolio content
INSERT contact_messages

Public cannot modify portfolio content.

Public cannot read contact messages.

Admin can manage portfolio content and messages according to secure authorization policies.

38. Internationalization

Public portfolio:

/en
/id

Preserve the existing i18n implementation.

Content that differs between languages should support both English and Indonesian.

39. Environment Variables

Use:

NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY

Never put service-role credentials in NEXT_PUBLIC_*.

40. Error Handling

The app must distinguish:

Successful query with zero rows

from:

Database/network/query error

For example, Skills fallback is only used when the query succeeds and returns zero rows.

Do not silently hide Supabase errors.

41. Verification

The implementation is NOT considered complete merely because:

Components compile

HeroScene.tsx exists

Three.js packages are installed

The coding agent says it is implemented

The developer must verify the actual browser result.

Check:

Desktop

3D scene visible

Smooth scrolling

Smooth transitions

Mouse interaction

All sections work

UI remains readable

Mobile

Scene visible or appropriately simplified

No severe performance problems

UI remains readable

No 3D element blocks interaction

Theme

Dark mode = emerald neon

Light mode = blue neon

Scroll

Verify:

Hero → Energy Flow
About → Neon Liquid
Skills → Orbital Rings
Projects → Particle Field
Experience → Energy Trails
Contact → Energy Core

Transitions must be continuous.

42. Definition of Done

Public Portfolio

Existing design is preserved.

Bento Grid is preserved.

Navbar is preserved.

Dark/light themes are preserved.

Existing content structure is preserved.

Old horizontal name animation is removed.

Full name remains visible normally.

One global Three.js Canvas exists.

Canvas persists across the entire page.

3D scene transforms with scroll.

Hero has Neon Energy Flow.

About has Neon Liquid transformation.

Skills has Neon Orbital Rings.

Projects has Neon Particle Field.

Experience has Neon Energy Trails.

Contact has Neon Energy Core.

Mouse interaction is subtle.

Lenis smooth scrolling works.

GSAP ScrollTrigger controls scroll-driven transitions.

Reduced motion is respected.

Mobile experience is optimized.

CMS

Admin login works.

Admin authorization is secure.

Profile is editable.

Hero is editable.

Skills are editable.

Projects are editable.

Experience is editable.

Certificates are editable.

Social links are editable.

CV is manageable.

Contact messages are manageable.

Supabase

Database is connected.

Storage is connected.

RLS is enabled.

Admin permissions are secure.

Public permissions are restricted.

Contact form works.

Service-role key is never exposed.

Final Experience

The result should feel like:

A clean developer portfolio with a persistent futuristic neon 3D environment that evolves smoothly as the user scrolls through the entire website.

It should feel premium and interactive without turning the portfolio into a Three.js demo.