# alchemit.github.io

The site created according to instructions
[here](https://pages.github.com/). Currently just testing how this
hosting works.

It should be possible to redirect an own domain name by putting it in `CNAME`
file in the main folder of the repository. If the `CNAME` file is present,
the regular URL `username.github.io` shows `404 not found` error, so the only
way to access the page is to have the proper domain defined in DNS.

Before commiting changes from local machine to github, one should setup
the author in `git-config`. It could be done with command:

    git config --global --edit

After doing this, you may fix the identity used for committing changes:

    git commit --amend --reset-author

But without the `--global` option, the author identity is defined locally for
the repository. While the author email must be the same as with the registered
github account, the author name may be a different nickname for different
project.

Cloning:
  
    git clone https://github.com/username/username.github.io
    cd username.github.io

After adding file or directory, or introducing changes to them, they will not
be committed/published unless the new or updated files are marked for commit,
with either `git-add` or `-a` option of `git-commit`:

    git add file

Tagging (a "lightweigt, unannotated" tag):

    git tag v0.01

Commiting (aka accepting) changes. Option `-a` causes all changes to known
files to be committed. Without it, the commit will be applied only to files
marked for addition or removal, or specified explicitly:

    git commit -a -m "description"

If after a commit more changes are introduced and one decides to make them part
of the previous commit, they could be amended:

    git commit -a --amend

Pushing changes up to the repository. Option `-u` adds an upstream reference
useful for tracking:

    git push -u origin master

The `origin` is the repository from the source was fetched, and `master` is the
branch name. Without these args, it would use defaults set by `git-config` and
defined for the current repository in `.git/config`.

WARNING: pushing changes over internet require authentication; in case of
github.com, using username and password. It is therefore important that the
repository url (e.g. in `.git/config` or command line) should be with `ssh:` or
`https:`.

<!--
vim: spelllang=en:et:ts=4:tw=79:ff=unix
-->
