# alchemit.github.io

The site created according to instructions
[here](https://pages.github.com/). Currently just testing how this
hosting works, and learning git on the way.

It is possible to redirect an own domain name by putting it in `CNAME`
file in the main folder of the repository. If the `CNAME` file is present,
the regular URL `username.github.io` shows `404 not found` error, so the only
way to access the page is to have the proper domain defined in DNS.
Setting CNAME can be done via settings on Github
or manually. Of course, the DNS settings of the domain should point to
github.io - see [Github Pages
Help](https://help.github.com/articles/using-a-custom-domain-with-github-pages/)

Before commiting changes from local machine to github, one should setup
the author in `git-config`. It could be done with command:

    git config --global --edit

Author name appears in commits history, if you care about privacy you can use
the Github account name there.  After changing author, you may need to fix the
identity used for committing changes:

    git commit --amend --reset-author

But without the `--global` option, the author identity is defined locally for
the repository. While the author email must be the same as with the registered
github account, the author name may be a different nickname for different
project.

## Cloning
The repository can be created online and then cloned to local machine. An empty
repository could be populated in any way, e.g. from a tarball:
  
    git clone https://github.com/username/username.github.io
    cd username.github.io
    tar xzf ../some/path/tarball.tgz
    git add .

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

One should not amend if the changes were oushed upstream in between.

Pushing changes up to the repository. Option `-u` adds an upstream reference
useful for tracking:

    git push -u origin master

The `origin` is the repository from the source was fetched, and `master` is the
branch name. Without these args, it would use defaults set by `git-config` and
defined for the current repository in `.git/config`.

Pushing will fail if the repository was changed by someone else, or by myself
but from elsewhere (e.g. edited directly on Github). In such case, first commit
the changes locally, then run:

    git pull origin master

what will fetch latest changes from upstream (origin) and then it will run
merging process between local and remote trees. If changes are in different
files, it goes smoothly, otherwise conflicting changes must be resolved.
Afterwards, the local changes can be pushed again.

WARNING: pushing changes over internet require authentication; in case of
github.com, using username and password. It is therefore important that the
repository url (e.g. in `.git/config` or command line) should be with `ssh:` or
`https:`.

<!--
vim: spelllang=en:et:ts=4:tw=79:ff=unix
-->
