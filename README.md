# alchemit.github.io

The site created according to instructions
[here](https://pages.github.com/). Currently just testing how this
hosting works.

It should be possible to redirect an own domain name by putting it in CNAME
file in the main folder of the repository, according to

Before commiting changes from local machine to github, one should setup
the author in `git-config`. It could be done with command:

    git config --global --edit

After doing this, you may fix the identity used for committing changes:

    git commit --amend --reset-author

Cloning:
  
    git clone https://github.com/username/username.github.io
    cd username.github.io

After adding file or directory:

    git add file

Tagging (a "lightweigt, unannotated" tag):

    git tag v0.01

Commiting (aka accepting) changes. Option `-a` causes all changes to known
files to be committed. Without it, the commit will be applied only to files
marked for addition or removal, or specified explicitly:

    git commit -a -m "description"

Pushing them up to the repository. Option `-u` adds an upstream reference
useful for tracking:

    git push -u origin master

The `origin` is the repository from the source was fetched, and `master` is the
branch name. Without these args, it would use defaults set by `git-config` and
defined for the current repository in `.git/config`.

<!--
vim: spelllang=en:et:ts=4:tw=79:ff=unix
-->
