---
title:  "Domains as Cargo Namespaces"
date:   2018-10-27
update: 2022-06-16
---

<div class="warn">
  Dear reader, comments on this page are invite-only due to low-quality feedback.<br/>
  Please refrain from linking this page on language community forums and similar venues.
</div>

### Summary

Provide a namespacing facility which addresses the following requirements:

1. Allow claiming a namespace, thereby restricting the set of persons that can publish crates under it.
2. Avoid disputes over namespaces, which can take massive amounts of time and resources to manage.
3. Guarantee that namespaces are unique, solving the issue of "clashing" namespaces. Non-unique namespaces work poorly and cause disputes, as demonstrated by npm's `kik` conflict.
4. Avoid creating a hard dependency on external services. The recent AWS/GitHub service interruptions are a good example why this is important.
5. Make receiving a namespace as seamless as possible for users. Namespaces should be an additional benefit crate authors receive, not some annoying bureaucratic hurdle they have to jump over.

### Design

- Use (sub)domains as namespaces. _Maven_ has shown that this approach has been working exceedingly well for more than a decade.
- Control of a (sub)domain is established using domain validation (DV), for instance through DNS TXT recorsd or [RFC5785](https://tools.ietf.org/html/rfc5785).
  _Let's Encrypt_ is successfully using this approach to generate millions of certificates each year.
- Crates.io maintainer will never need to get involved in namespace disputes, as ICANN's _Uniform Domain-Name Dispute-Resolution Policy_ deals with this.

#### Example flow: user validates domain

A user wants to publish their `foobar` crate under their domain `foobar-project.org`.

1. The user adds `organization = "foobar-project.org"` to their `Cargo.toml` file.
2. The user runs `cargo publish`.
3. The command prints the following text to the console that contains a randomly generated token:
   > Crates.io couldn't verify that you own `foobar-project.org`. To prove ownership, either
   >
   > a) create a DNS TXT record with the value `ZG2ioiTY3tMgwDYfmb6p` for the domain `foobar-project.org`, or
   >
   > b) place a text file with the text `ZG2ioiTY3tMgwDYfmb6p` at `https://foobar-project.org/.well-known/cargo-publishers`.
4. The user follows the instructions and reruns `cargo publish`. crates.io checks that the token matches and publishes the crate under the namespace.

Upon the first request to publish a crate with a namespace, crates.io generates a random string that is user-, crate- and domain-specific.

On each following publishing request crates.io checks whether the token is identical to what crates.io has on file for the specific user/crate/domain combination.

#### Example flow: user wants to publish crate to a namespace maintained by others

The ability to publish a crate is not limited to one person: If a different person wants to publish a crate to a domain, crates.io returns a similar reply:

> You are not allowed to publish your crate `blurbs` under the `foobar-project.org` namespace.
> Owners of the namespace may change their domain validation token to either
>
> a) `Io3487xY3tjg54Ef9Opz` to allow you to publish `blurbs` under the `foobar-project.org` namespace, or
>
> b) `Hg7jak43EnHJ3la8DJ3J` to allow you to publish any crate under the `foobar-project.org` namespace.

This person would then contact the owner of the namespace, who could decide whether to accept or reject this request.

This also serves as a very easy way to allow external contributors to publish add-on crates to a crate in an organization,
without allowing them to publish to the main crate. E.g. authors of serde could publish their own crate under `serde.rs/serde`
and allow vetted, "official" add-on crates to be published by external contributors under `serde.rs/serde-abc` or
`serde.rs/serde-xyz`.

#### Example flow: change in domain ownership

This largely follows the flow of "user validates domain", except that publishing a new version of a crate that was
published by a previous domain owner is rejected with the following message:

> You are not allowed to publish your crate `blurbs` under the `foobar-project.org` namespace,
> because a previous owner of the namespace has already used that crate name.
>
> To receive permission to re-use the crate name from the previous owner, you can ask them to navigate to
> `https://crates.io/me/transfer-crate-name?crate=blurbs&newOwner=your-account` and transfer the crate name to you.

This person would then contact the owner of the namespace, who could decide whether to accept or reject this request.

### Required Changes

#### Changes to cargo

cargo and its Cargo.toml format needs to be extended to allow
- adding `organization` keys to Cargo.toml files and treat them correctly
- adding dependencies on namespaced crates to Cargo.toml files

#### Changes to crates.io

crates.io needs to be extended
 - to understand `organization` keys and namespacing
 - to validate control of (sub)domains as specified above
 - to correctly display such crates on the web

#### Changes to the Language

No changes to the language are required. Source code of crates does not need to be changed to enable namespaces.

### Further Suggestions

It is recommended that `/` is used as a separator between the namespace and the crate name.

This would mean that a fully-qualified crate would look like a URL, making it easy to find further documentation or the project's homepage:

Consider a crate called `foobar` with the namespace `foobar-project.org`. The fully-qualified name would be `foobar-project.org/foobar`.
This looks like a real URL and the namespace owner could place documentation there, forward to the crates GitHub page, or redirect to doc.rs.

### Out of Scope

This proposal does not discuss changes to the global namespace.

### FAQ

_This FAQ is not meant as a complete enumeration of all possible scenarios._

*Do I need my own domain?*

No. A subdomain is sufficient. Every Rust crate author owns at least one already through their GitHub account.

*I no longer care about maintaining the domain, what should I do?*

Ask your maintainers or contributors to take over the domain. (This is not much different from a situation where the original author loses interest in maintaining his/her crate.)

*My domain was hacked!*

Use your domain registry's support channels to resolve this issue.
In the meantime, it might make sense to let crates.io maintainers know, so that the publication of new crates can be disabled until the issue is resolved.
(This is not much different from your crates.io account being compromised.)

*Someone else owns my domain now!*

Pick a new domain. Even if the new owners of the domain want to publish crates, they will not be able to publish newer versions of existing crates without your consent.
