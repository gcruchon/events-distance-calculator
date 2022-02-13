# First stage builds the application
FROM registry.redhat.io/ubi8/nodejs-14 as builder

# Add application sources
ADD package.json $HOME
ADD package-lock.json $HOME
ADD build $HOME/build
ADD data $HOME/data

# Install the dependencies
RUN npm ci --prod

# Second stage copies the application to the minimal image
FROM registry.redhat.io/ubi8/nodejs-14-minimal

# Copy the application source and build artifacts from the builder image to this one
COPY --from=builder $HOME $HOME

# Run script uses standard ways to run the application
CMD node build