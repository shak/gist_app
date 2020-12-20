Instructions:

- Clone the repo locally.
- Ensure you have Node available.
- Run `npm install` to install the dependencies.
- Once all dependencies have finished installing, run `npm start`. I have set up the application to automatically transpile, minify and output to a dist directory from which it would be served on the local host. The `start` script should output the address in the command line also but find it at `http://localhost:9000/`

Tods/Nice to Have:

The app can be improved in the follwing ways which I have skipped to shortage of time and prototype nature of the application.

- Github's `Octokit` can be used to manage API comms, currently using `fetch`.
- Rate limiting will be an issue. Especially because we are pulling forks information once per gist. I've limited the scope for hitting the limit by introducing a smaller page size but it will eventually happen. This can be mitigated by using a personal auth token (I was using that during dev but have decided not to commit it with the application) or better yet, implementing server-to-server fetch using a middleware plus authorization token.
- For above reason, I've implemented pagination to fulfill the requirement for 'showing all public gists' and only pulling data in small chunks.
- The application is fairly small and there are no cross-cutting concerns present therefore there was no need for centralised state management. For anything more complex I'd consider `Redux` potentially.
- Some of the components could be moved to higher-order components and extended/reused but there was no use case present. Avatar component was reused however but not moved to higher order component as data was fairly static.
- Using new hooks API to demonstrate component organisation and business logic re-use, this can be improved with pagination etc. I've demonstrated an example using API reducer.
- Could also potentially enrich the API response by parsing it through a Gist factory which will return Gist objects that can encapsulate the business logic for pulling last 3 forks or unique file types etc.
- I have not implemented tests (as they weren't required) but personally, I would expect tests to be part of the app development. This can be further discussed and implemented.
- Test explicitly asked for CSS. Would have preferred to use SASS.