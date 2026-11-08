# Kynetic visual system

The approved visual reference is the violet Kynetic landing page with the headline “Pay for robot improvement, not just more data.” Use its proportions and rhythm for future screens. Theme and layout definitions live in `app/globals.css`; reusable controls live in `components/ui`.

## Composition

- Wrap page content in `page-surface` for the shared background and violet atmosphere.
- Use `page-container` for a centered content width of up to 1360px. Its responsive outer gutter is shared by all sections.
- Use `site-header` and `site-header-inner` for the navigation frame. The icon-only header is centered within a compact 960px container so the wallet controls do not drift to the page edge. The logo and standard controls share a 40px height on desktop.
- Use `gap-grid`, `px-page`, `p-card`, and `py-section` for recurring spacing. Do not invent a different gutter for every section.
- Use the Tailwind 4px scale for internal relationships: 8px for related text, 12–16px for control groups, 20px for card padding, and 48–72px between major sections.
- Keep intentional spacing between groups. Do not add both a parent gap and a child margin for the same separation.

## Shared defaults

| Element                          | Rule                                                                                                |
| -------------------------------- | --------------------------------------------------------------------------------------------------- |
| Standard button / input / select | 40px high; 16px horizontal padding                                                                  |
| Small control                    | 32px high                                                                                           |
| Large marketing button           | 44px high; 24px horizontal padding                                                                  |
| Card padding                     | 20px; 16px for `size="sm"`                                                                          |
| Card anatomy                     | Header owns top padding; content owns its top gap and bottom padding; no additional wrapper padding |
| Grid gap                         | 16–24px, responsive                                                                                 |
| Card title → description         | 8px in feature cards                                                                                |
| Feature icon                     | Shared `ui-icon-tile`; 44px                                                                         |
| Dropdown                         | 4px inset around options; opens below its trigger                                                   |
| Tooltip                          | Compact dark surface, no decorative arrow                                                           |

Use `Button`, `Card`, `Input`, `Select`, `Tabs`, `Badge`, and overlay primitives directly. Their shared defaults carry the visual styling. Avoid overriding their heights, padding, colors, radii, or shadows per instance unless the layout calls for a documented exception.

`CardHeader`, `CardContent`, and `CardFooter` already provide padding. Do not put `p-0` on every card and rebuild that spacing manually. For feature cards, use `feature-card` and `ui-icon-tile`; text size and surface decoration are defined centrally.

## Color and depth

Use semantic colors (`primary`, `card`, `muted-foreground`, `border`) throughout. The theme controls dark and light modes. Primary buttons share the violet action gradient. Cards share subtle tinted surfaces and panel shadows. Use `shadow-panel` for surfaces and `shadow-float` for elevated overlays. The main atmospheric glow belongs to the page, rather than to every component.

## Typography and responsive behavior

Use Inter with exactly three font sizes: `text-display` (40px) for the page headline, `text-heading` (20px) for section and card headings, and `text-body` (14px) for descriptions, labels, inputs, buttons, metadata, and badges. Distinguish labels with weight and muted color rather than extra sizes. Do not add arbitrary font sizes or responsive size overrides. Existing Tailwind size names map to these three tokens for shadcn compatibility. Headings use tight tracking; body copy uses comfortable line height. Preserve the supplied landing-page wording.

The landing feature grid has a 960px maximum width, aligned with the header, producing desktop cards about 300px wide. On phones it becomes one column with a maximum card width of 384px. Hero actions stack and fill their group on phones. Keep controls visible without shrinking text into unreadable sizes; hide desktop navigation before it collides with the brand or wallet controls.

## Future components

New shadcn components inherit semantic theme colors and fonts. Apply these geometry rules in their shared source once. Page composition still needs the appropriate container and spacing utilities; global CSS cannot infer which elements belong together. Extend the shared system instead of adding isolated visual overrides to each page.

## Compact density

All new compositions should use the compact defaults: 20px card insets, 16px overlay insets, 12px input insets, 36px tab lists, 22px badges, and 32px network pills. Small switches and toggles already fit this density; preserve their usable interaction targets. Keep body copy readable instead of shrinking every element equally.

## Challenge marketplace

`/challenges` is the searchable challenge directory. `/challenges/[slug]` provides Overview, Data, Code, Discussion, Leaderboard, and Rules. The marketplace uses the shared three-size type scale, standard controls, and compact cards. Its wider content frame follows the approved challenge layouts. Sample challenge records live in `app/lib/challenges/data.ts`.

Challenge economics are displayed in SOL. Dataset preparation and comments are local preview interactions; no challenge staking, dataset upload, evaluation, escrow funding, or settlement service is connected. Do not present sample results or escrow balances as on-chain records. Wallet connection continues using the existing wallet provider.

The detail-header photograph is stored at `public/reflective-robotics.png`. It was generated with the built-in image tool from the brief: a reflective steel mug in a dark robotics lab, a blurred robot perception sensor, restrained violet lighting, and a thin detection box.
