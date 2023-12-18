# Approach

When choosing a strategy for any greenfield application, I try to consider the scenario in which the application is built. This API is built with the following assumptions in mind: The code-base will be maintained by a small team, the code will need constant feature development and maintenance, and the API will be deployed to a cloud environment.

For this API, I've chosen to take an object-oriented approach. This may not be the standard approach for a NodeJS application, but as I'm more familiar with this style of programming, I felt it would make the development of the API quicker. In the context of a team, it can also suit less experienced developers that are more familiar with OOP than functional or procedural programming.

## Using NestJS

Whilst there are many advantages of using NestJs (it's a well supported and complete framework with good documentation), I also recognise that it can be opinionated and overkill for a simple API such as this. There's a couple of scenarios that I felt it's opinionated nature was a hinderance: In particular, it's modular structure tends to encourage the creation of artificial boundaries between code rather than boundaries that suit the domain in question, and a service oriented architecture that encourages abstractions that are often superfluous. 

However, I decided the framework had many benefits that made it worth while adopting. Apart from the in-built support of OOP and Typescript, it also provides a complete feature set for request/response serialization, validation, ORM integration, database migrations, testing, logging and configuration - all features that are suitable for development within a business context, where it's ideal that boiler plate code is minimal.

## Considering Deno

Given that Deno is a newer runtime that treats Typescript as a first class citizen, it did cross my mind whether this could be a good choice for a runtime instead of Node. However, given Deno's relative immaturity, I felt it's adoption would have the potential to introduce instability and a risk to the longevity of any API that is built using it.

## REPR Pattern & Vertical Slice Architecture

The REPR (Request, Endpoint, Response) pattern is a way of structuring endpoints that promote vertical slice architecture (VSA). From my experience, VSA allows API endpoints to clearly define their contract with the outside world, and also allows for the code to be structured in a way that is easy to maintain and refactor. If using vanilla Express.js, this pattern is as standard. But with NestJS, it's a more difficult to adopt, because NestJs promotes the Model-View-Controller (MVC) pattern. However, by defining an endpoint request, response and implementation in a single file, the MVC controller becomes a simple router to a REPR implementation, retaining the benefits of VSA.

## Domain Driven Design

I often choose Domain Driven Design as a default approach for building an API. Even though the domain is relatively simple, I find it's focus on building models that are self-describing and is often incredibly helpful in capturing context within code.

## Using a relational database

I usually start with a relational database by default. The reason for this is because a lot of developers are more familiar with relational databases, and on the occasions that modelling requires a more flexible structure, relational databases still offer the option of using JSON columns.


