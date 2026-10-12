// Turns src/index.html into one data URI. Run: node build.mjs
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { minify } from "terser";

const LIMIT = 3072;
const src = readFileSync("src/index.html", "utf8");

// Squeeze whitespace in shaders written as glsl`...` (terser leaves strings alone).
function glsl(code) {
    return code
        .replace(/\/\/.*|\/\*[\s\S]*?\*\//g, "")
        .replace(/\s+/g, " ")
        .replace(/\s*([-+*\/=<>(){}\[\];,!&|?:])\s*/g, "$1")
        .trim();
}

let html = "";
for (const part of src.split(/(<script>[\s\S]*?<\/script>|<style>[\s\S]*?<\/style>)/)) {
    if (part.startsWith("<script>")) {
        const js = part.slice(8, -9).replace(/glsl`([^`]*)`/g, (_, s) => JSON.stringify(glsl(s)));
        const { code } = await minify(js, { toplevel: true, compress: { passes: 3 } });
        html += "<script>" + code + "</script>";
    } else if (part.startsWith("<style>")) {
        html += part
            .replace(/\/\*[\s\S]*?\*\//g, "")
            .replace(/\s+/g, " ")
            .replace(/\s*([{};:,>])\s*/g, "$1")
            .replace(/;}/g, "}");
    } else {
        html += part.replace(/<!--[\s\S]*?-->/g, "").replace(/\s+/g, " ").replace(/>\s+</g, "><").trim();
    }
}

// Only these three break a data URI. Encoding anything else costs bytes for nothing.
const uri = "data:text/html," + html.replace(/%/g, "%25").replace(/#/g, "%23").replace(/\n/g, "%0A");

mkdirSync("dist", { recursive: true });
writeFileSync("dist/index.html", html);
writeFileSync("dist/uri.txt", uri);

// Modify README to contain updates uri text
try {
    const readmePath = "README.md";
    const readmeContent = readFileSync(readmePath, "utf8");

    const markerRegex = /<!-- URI_START -->[\s\S]*?<!-- URI_END -->/;
    const replacement = `<!-- URI_START -->\n\`\`\`html\n${uri}\n\`\`\`\n<!-- URI_END -->`;

    if (markerRegex.test(readmeContent)) {
        const updatedReadme = readmeContent.replace(markerRegex, replacement);
        writeFileSync(readmePath, updatedReadme);
        console.log("Updated README with new URI block")
    }
} catch (error) {
    console.error("Failed to update README.md", error.message);
}

const bytes = Buffer.byteLength(uri);
console.log(bytes + " / " + LIMIT + " bytes, " + (bytes > LIMIT ? bytes - LIMIT + " over" : LIMIT - bytes + " left"));