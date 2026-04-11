const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// Replace standard emojis with Phosphor icons
const replacements = {
    '📋': '<i class="ph ph-file-text"></i>',
    '✅': '<i class="ph ph-check-circle"></i>',
    '⏳': '<i class="ph ph-hourglass"></i>',
    '🔴': '<i class="ph ph-warning-circle"></i>',
    '🔬': '<i class="ph ph-microscope"></i>',
    '👥': '<i class="ph ph-users"></i>',
    '🛡️': '<i class="ph ph-shield"></i>',
    '🏥': '<i class="ph ph-hospital"></i>',
    '📂': '<i class="ph ph-folder"></i>',
    '👶': '<i class="ph ph-baby"></i>',
    '💳': '<i class="ph ph-credit-card"></i>',
    '⚠️': '<i class="ph ph-warning"></i>',
    '📉': '<i class="ph ph-trend-down"></i>',
    '🩺': '<i class="ph ph-stethoscope"></i>',
    '🎲': '<i class="ph ph-dice-five"></i>',
    '📐': '<i class="ph ph-ruler"></i>',
    '📊': '<i class="ph ph-chart-bar"></i>',
    '👤': '<i class="ph ph-user"></i>',
    '👑': '<i class="ph ph-crown"></i>',
    '🚪': '<i class="ph ph-sign-out"></i>',
    '✏️': '<i class="ph ph-pencil-simple"></i>',
    '🗑️': '<i class="ph ph-trash"></i>',
    '🔒': '<i class="ph ph-lock-key"></i>',
    '🔓': '<i class="ph ph-lock-key-open"></i>',
    '🖨️': '<i class="ph ph-printer"></i>',
    'ℹ️': '<i class="ph ph-info"></i>',
    '✓': '<i class="ph ph-check"></i>',
    '✗': '<i class="ph ph-x"></i>',
    '☀️': '<i class="ph ph-sun"></i>',
    '🌙': '<i class="ph ph-moon"></i>',
    '⛔': '<i class="ph ph-minus-circle"></i>',
    '🟢': '<i class="ph ph-check-circle text-green-500"></i>',
    '🟡': '<i class="ph ph-warning text-yellow-500"></i>',
    '🟠': '<i class="ph ph-warning-circle text-orange-500"></i>',
    '›': '<i class="ph ph-caret-right"></i>',
    '‹': '<i class="ph ph-caret-left"></i>',
    '✕': '<i class="ph ph-x"></i>',
    '↺': '<i class="ph ph-arrows-clockwise"></i>',
    '💾': '<i class="ph ph-floppy-disk"></i>'
};

for (const [emoji, iconString] of Object.entries(replacements)) {
    // Handle specific cases inside string literals carefully for React/JS templates vs HTML
    // We can do a global replace safely because emojis are unique.
    const regex = new RegExp(emoji, 'g');
    content = content.replace(regex, iconString);
}

// Adjust font DM Serif Display to Plus Jakarta Sans for hero and branding since we want a modern SaaS look
content = content.replace(/font-family:\s*'DM Serif Display',\s*serif;/g, 'font-weight: 800; letter-spacing: -0.5px;');

fs.writeFileSync('index.html', content);
console.log('Done replacing emojis and fonts.');
