# Motors / Router

## Summary

A simple, flexible, lightweight javascript router built for *non single page* applications.

## Why?

I could not find a simple solution to run page specific javascript while also using a module system.

## Usage

* [Configuration](#configuration)
* [Simple Routes](#simple-routes)
* [Simple Routes with App](#application-routes-app)
* [Controller Routes](#controller-routes)
* [Controller Routes with App](#controller-routes-app)

### Configuration

Configration settings.

```js

router.config({

    controllers: './controllers'

});

```

### Simple Routes

The easiest example of using motors/router.

```js

router.route({

    // Executes on route http://domain.com/landing
    'landing': function() {
        
        console.log('On the landing page');
        
    },
    
    // Executes on route http://domain.com/profile/1
    'user/{id}': function(args) {
    
        console.log('On user profile with id : ' + args.id);
    
    }

});

```

### Simple Routes with App 

Using an application object.

Motors/router allows you to seperate out your application logic into a seperate object to pass into the router.

```js

var app = {

    // Executed before routing
    before: function() {
    
        //
    
    },
    
    // Executed after routing
    after: function() {
    
        //
    
    },

    routes: {
        
        ...
        
    }

};

router.route(app);

```

### Controller Routes

Using controllers.

```js

// controller/landing.js

var landing = {

    // Executed before controller initialization
    before: function() {
    
        //
    
    },
    
    // Executed after controller initialization
    after: function() {
    
        //
    
    },

    // Executed on route
    init: function() {
    
        //
    
    }

};

```

```js

router.config({

    controllers: './controllers'

});

router.route({

    // Finds the controller named `landing` in the router.config.controllers directory
    'landing': 'landing'

});

```

### Controller Routes with App

Combining controllers with an application object.

```js

// controller/landing.js

var landing = { ... };

```

```js

// controller/user/profile.js

var profile = { ... };

```

```js

var app = {

    before: function() { ... },
    
    after: function() { ... },

    config: {
    
        controllers: './controllers'
        
    },
    
    routes: {
    
        'landing': 'landing',
        'user/profile/{id}': 'user.profile'
    
    }

};

```