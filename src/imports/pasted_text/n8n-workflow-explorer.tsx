Create a world-class, $100K+ N8N Workflow Explorer web application with a premium, real-app feel. The design should be clean, professional, and visually stunning — comparable to top-tier SaaS products like Linear, Vercel, or Notion.

## 🔥 **Core Design Principles**

- Dark theme premium with emerald/teal accents (#10b981, #059669)
- Heavy glassmorphism (backdrop-blur 12-20px, translucent backgrounds)
- Micro-interactions (0.3s cubic-bezier transitions, hover lifts, subtle glows)
- Clean, minimal layout — remove clutter, focus on workflows
- Real-app polish (smooth loading states, toast notifications, animated counters)

## 📁 **Layout Structure**

### 1. **Navbar** (Sticky, glass effect)
- Logo: N8N Hub with bolt icon
- Search bar: Real-time search with debounce
- Dark mode toggle (moon/sun icon)
- Version badge

### 2. **Main Layout**

#### **A. Admin Info Section** (NEW — Premium)
Displayed prominently above or beside the workflow grid:
- **Profile photo** (circular, with border glow)
- **Admin name** (e.g., "N8N Master")
- **Short bio/tagline** (e.g., "Automation Architect • 10+ years")
- **WhatsApp Channel Button** (with icon)
  - Direct link to WhatsApp channel
  - Premium styling with green gradient (#25D366)
  - Hover effect with scale
  - "Join WhatsApp Channel" text
  - Opens in new tab

#### **B. Filters Row** (above workflow grid)
- Complexity filters: All, Simple, Medium, Complex (chip buttons)
- Trigger filters: All, Manual, Scheduled, Triggered, Webhook (chip buttons)
- Reset filters button
- Active filters badge

#### **C. Stats Bar** (compact)
- Total Workflows (animated counter)
- Popular Complexity (dynamic)
- Popular Trigger (dynamic)

#### **D. Workflow Grid** (3 columns on desktop, 2 on tablet, 1 on mobile)
Each card should have:
- Gradient header with icon
- Favorite button (heart icon, localStorage persistence)
- Title (bold, white)
- Description (2-line clamp)
- Tags: complexity, trigger type, node count
- Action buttons: GitHub, Download JSON, Details
- Hover effect: translateY(-6px), border glow, shadow increase

#### **E. Pagination** (Previous · Page X of Y · Next)

### 3. **Footer** (Professional, minimal)

## 🎯 **Specific Requirements**

### ✅ **Admin Info Section (Must Include)**
- ✅ Circular profile picture with emerald border glow
- ✅ Admin name and title
- ✅ WhatsApp channel button with:
  - WhatsApp green (#25D366) gradient
  - WhatsApp icon
  - "Join WhatsApp Channel" or "Follow on WhatsApp"
  - Opens in new tab: `https://whatsapp.com/channel/...`
  - Hover: scale 1.05, shadow increase

### ✅ **Remove Completely:**
- ❌ No categories section
- ❌ No category filters
- ❌ No category list in sidebar
- ❌ No category counts

### ✅ **Keep & Enhance:**
- ✅ Complexity filters (All, Simple, Medium, Complex)
- ✅ Trigger filters (All, Manual, Scheduled, Triggered, Webhook)
- ✅ Search bar with real-time filtering
- ✅ Favorites system with localStorage
- ✅ Toast notifications (bottom-right)
- ✅ Back-to-top button (bottom-left)
- ✅ Dark/light mode toggle
- ✅ Skeleton loading with shimmer effect
- ✅ Animated counters for stats
- ✅ Responsive design (mobile first)

## 🧠 **Smart Design Decisions**

- **No sidebar** — use filters row + admin info section above grid
- **Admin info** should be visually prominent but not intrusive
- **WhatsApp button** should feel like a premium CTA
- **Cards** should feel tactile with subtle depth
- **Colors**: Use emerald-400 as primary, emerald-600 as hover, gray-800 as background
- **Shadows**: `0 20px 40px -12px rgba(16,185,129,0.15)` for premium feel
- **Borders**: `border-white/5` or `border-emerald-500/20` on glass elements

## 📱 **Responsive Behavior**

| Breakpoint | Grid | Admin Section | Filters |
|------------|------|---------------|---------|
| Mobile (<640px) | 1 column | Stacked, compact | horizontal scroll |
| Tablet (640-1024px) | 2 columns | Row with avatar left | wrap |
| Desktop (>1024px) | 3 columns | Row with avatar + bio + button | inline-flex |

## 🚀 **Data Integration**

- API: `https://n8nster.vercel.app/api/n8n?endpoint=templates`
- Fetch with pagination (limit 9)
- Client-side search filtering
- Error handling with retry button

## ✨ **Premium Touches**

- Smooth splash screen with progress bar
- Card hover: lift + glow effect
- Active filter chips with emerald border
- Toast messages with left border color (green for success, red for error)
- Back-to-top button fades in after 300px scroll
- Dark mode transitions smoothly
- Animated number counters for stats
- **WhatsApp button pulse animation** (subtle ping on load)

## 🧪 **Testing Criteria**

- [ ] Admin info section visible with profile photo, name, bio
- [ ] WhatsApp channel button works and opens correct link
- [ ] No categories section anywhere
- [ ] Filters row works perfectly
- [ ] Search filters workflows in real-time
- [ ] Favorites persist in localStorage
- [ ] Dark mode toggles correctly
- [ ] Pagination works with search results
- [ ] Mobile responsive
- [ ] Toast notifications appear

## 📝 **Output Format**

Single HTML file with embedded CSS and JavaScript. Use:
- Tailwind CSS CDN
- Google Fonts (Inter)
- Font Awesome CDN
- All styles in `<style>` tag
- All scripts in `<script>` tag at bottom

---

**The final product should feel like a $100K+ enterprise tool — clean, fast, polished, and professional. Admin info with WhatsApp channel, no categories, pure workflow exploration.**