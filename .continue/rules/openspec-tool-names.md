---
globs: "**/*.{md,txt}"
description: Ensure correct tool naming for OpenSpec workflow to avoid 'tool not
  found' errors.
alwaysApply: false
---

Always use the correct tool names: use 'create_new_file' (not 'write_file') for creating new files, 'edit_existing_file' (not 'edit_file') for editing files, and 'read_file' (not 'read_skill') for reading files. For skills, use 'read_skill'.