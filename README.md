# thingysync - Small helper tool to help syncronisation of our thingies using git 

# Why?
When dealing with multiple  levels of git submodules in a git repository I want to push and pull everything with one command.

Also the idea is to have extended synchronisation functionality. A convenience layer actually using git. 

Because I use git more for synchronisation and codesharing other than version control.

# What?
So this is the first version of thingysync.
It has the capability to push and pull the whole thingystructure of submodules.

# How?
Requirements
------------

* ssh-key access to your remote - ready in your shell
* [Git installed](https://git-scm.com/)
* [Node.js installed](https://nodejs.org/)

Installation
------------
Current git version
```sh
$ npm install -g git+https://github.com/JhonnyJason/thingsync-output.git
```

Npm Registry
```
$ npm install -g thingysync
```

Usage
-----
```sh
    Usage 
        $ thingysync <arg1> <arg2> <arg3>

    Options
        required:
            arg1, --command <command> , -c <command>
                command can either be "push" or "pull"

        optional:
            arg2, --path <path>, -p <path>
                the path to the base repository (may be relative or absolute)
            arg3, --message <message>, -m <message>
                commit message when pushing
                
    Examples
        $  thingysync pull ~/thingies/thingy-to-pull
```

Current Functionality
---------------------

Currently we only know 2 commands - pull and push.

## pull
Here we will start at our `path` and actually do 
```git pull origin master``` and ```git checkout master```
on every level.

The next levels are identified by looking at the `.gitmodules` file.

## push
For the `push` command we may provide a message also. If we don't provide a commit message it will default to be `"thingysync push"`.

For pushing we start from our leaves back to our root `path` doing 
```git checkout master``` then ```git add .``` then ```git commit "the message"``` and then ```git push origin master``` for every level.

Also here the branches for the tree are identified by looking at the `.gitmodules` file.



---

# Further steps
- status command to print status summary of what is out of sync
- status for multiple thingies
- status vs related remotes
- synchronisation with related remotes
- maybe add branch flexibility?
- ...

All sorts of inputs are welcome, thanks!

---

# License

## The Unlicense JhonnyJason style

- Information has no ownership.
- Information only has memory to reside in and relations to be meaningful.
- Information cannot be stolen. Only shared or destroyed.

And you wish it has been shared before it is destroyed.

The one claiming copyright or intellectual property either is really evil or probably has some insecurity issues which makes him blind to the fact that he also just connected information which was freely available to him.

The value is not in him who "created" the information the value is what is being done with the information.
So the restriction and friction of the informations' usage is exclusively reducing value overall.

The only preceived "value" gained due to restriction is actually very similar to the concept of blackmail (power gradient, control and dependency).

The real problems to solve are all in the "reward/credit" system and not the information distribution. Too much value is wasted because of not solving the right problem.

I can only contribute in that way - none of the information is "mine" everything I "learned" I actually also copied.
I only connect things to have something I feel is missing and share what I consider useful. So please use it without any second thought and please also share whatever could be useful for others. 

I also could give credits to all my sources - instead I use the freedom and moment of creativity which lives therein to declare my opinion on the situation. 

*Unity through Intelligence.*

We cannot subordinate us to the suboptimal dynamic we are spawned in, just because power is actually driving all things around us.
In the end a distributed network of intelligence where all information is transparently shared in the way that everyone has direct access to what he needs right now is more powerful than any brute power lever.

The same for our programs as for us.

It also is peaceful, helpful, friendly - decent. How it should be, because it's the most optimal solution for us human beings to learn, to connect to develop and evolve - not being excluded, let hanging and destroy oneself or others.

If we really manage to build an real AI which is far superior to us it will unify with this network of intelligence.
We never have to fear superior intelligence, because it's just the better engine connecting information to be most understandable/usable for the other part of the intelligence network.

The only thing to fear is a disconnected unit without a sufficient network of intelligence on its own, filled with fear, hate or hunger while being very powerful. That unit needs to learn and connect to develop and evolve then.

We can always just give information and hints :-) The unit needs to learn by and connect itself.

Have a nice day! :D