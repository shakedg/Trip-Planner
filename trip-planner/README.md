# Trip Planner: setup guide

A shared schedule for the December trip (Dec 16, 2026 to Jan 6, 2027).

- **Everyone with the link** can see the calendar and day-by-day schedule, download it to their own calendar (.ics), and send you suggestions ("Come for Friday dinner!").
- **Only you** (with the edit passcode) can add, change and delete plans, and see and accept suggestions.
- English and Hebrew, with a switch at the top. Works on phones.

## What's in the folder

```
public/            the website (index.html, styles.css, app.js)
netlify/functions/ the small server that saves the schedule (api.mjs)
netlify.toml       tells Netlify where things are
package.json       lists the one library the server uses
```

## Deploying to Netlify (about 10 minutes, no coding)

The schedule is saved in Netlify's built-in storage, so the site needs a deploy that includes the server function. **Netlify's drag-and-drop deploy doesn't build functions**, so use GitHub:

1. **Put the files on GitHub.** At github.com, create a new repository (it can be private), click **"uploading an existing file"**, and drag in *everything inside* this folder (`public`, `netlify`, `netlify.toml`, `package.json`, `README.md`). Click **Commit changes**.
2. **Connect it to Netlify.** At app.netlify.com, go to **Add new site → Import an existing project → GitHub** and pick the repository. Leave the build settings as they are (Netlify reads `netlify.toml`) and click **Deploy**.
3. **Set your edit passcode.** In the site, go to **Site configuration → Environment variables → Add a variable**, with key `EDIT_PASSCODE` and a value of your choice (for example `azoulay-dec26`). Then go to **Deploys → Trigger deploy → Deploy site** so it takes effect.
4. **Optional: rename the site.** In **Site configuration → Change site name** you can set something like `our-trip-home.netlify.app`.
5. **Share the link** with family and friends. To edit, tap **Edit** at the top and enter your passcode. Your device remembers it until you tap **Done editing**.

If you use the Netlify CLI instead: run `npm install`, then `netlify deploy --prod`, and set `EDIT_PASSCODE` with `netlify env:set EDIT_PASSCODE yourcode`.

## Customizing

Open `public/app.js`. The settings at the very top control:

- `start` / `end`: the trip dates
- `title` / `subtitle`: the English and Hebrew headings

The plan types and colors (Family, Friends, Stay-over…) are in `TYPES` just below.

## Tips

- **Multi-day visits:** set *From* and *Until (last day)*, and tick **We're staying overnight**. The day-by-day view then shows "Sleeping at: …" for each night.
- **Suggestions** show up in a box at the top when you're in edit mode. **Add to plan** turns one into a plan, and **Dismiss** removes it.
- The page refreshes itself every minute, so everyone sees the latest version.
- **Preview mode:** if you open `index.html` straight from your computer, it runs in preview mode and saves only in that browser. It's handy for trying it out, but nothing is shared until it's deployed.
