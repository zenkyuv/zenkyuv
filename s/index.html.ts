

import "@benev/slate/x/node.js"
import {template, html, easypage, headScripts, git_commit_hash, read_file, unsanitized, renderSocialCard} from "@benev/turtle"

const domain = "zenkyuv.com"
const favicon = "/assets/c.png"

export default template(async basic => {
	const path = basic.path(import.meta.url)
	const hash = await git_commit_hash()

	return easypage({
		path,
		dark: true,
		title: "zenkyuv webpage",
		head: html`
			<link rel="icon" href="${favicon}"/>
			<style>${unsanitized(await read_file("x/style.css"))}</style>
			<meta data-commit-hash="${hash}"/>

			<link rel="preconnect" href="https://fonts.googleapis.com">
			<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
			<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@900&family=Share+Tech&display=swap" rel="stylesheet">

			${renderSocialCard({
				themeColor: "#a7ff78",
				siteName: domain,
				title: "zenkyuv webpage",
				description: "some personal page",
				image: `https://${domain}${favicon}`,
				url: `https://${domain}/`,
			})}

			${headScripts({
				devModulePath: await path.version.root("main.bundle.js"),
				prodModulePath: await path.version.root("main.bundle.min.js"),
				importmapContent: await read_file("x/importmap.json"),
			})}
		`,
		body: html`
			<div class="content">
				<div class="card">
					<div class="profile-pic"></div>
					<h1 class="name">
						<span>zenky</span>
						<span class=actual-name>(Przemek Gałęzki)</span>
					</h1>
					<p class="tagline">build. ship. disappear.</p>
					<div class="projects">
						<a href="https://github.com/omni-media/omniclip" target="_blank">Omniclip</a>
						<a href="https://github.com/e280" target="_blank">e280</a>
						<a href="https://github.com/zenkyuv" target="_blank">More…</a>
					</div>
					<div class="contact">
						<a href="https://github.com/zenkyuv" target="_blank">GitHub</a>
						<a href="https://www.linkedin.com/in/przemek-gałęzki-1a7741231" target="_blank">LinkedIn</a>
					</div>
					<div class="footer">e280 founder · buildercore legend</div>
				</div>
			</div>
		`,
	})
})
