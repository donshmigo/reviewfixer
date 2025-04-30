#!/bin/bash
# Run build
npm run build

# Create Netlify.toml file for production
cat > netlify.toml << EOF
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NEXT_USE_NETLIFY_EDGE = "true"
  NODE_VERSION = "18"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[functions]
  external_node_modules = ["@node-rs/bcrypt", "jose", "openai"]
  node_bundler = "esbuild"
EOF

echo "Netlify deployment files created successfully." 