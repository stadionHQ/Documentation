---
currentMenu: Events
---


Exposed Events
============

There some events that you can hook into to do things at ceartin times.

* NewsletterSignupEvent
* SuccessfullRegistrationEvent



How to perform an action on an event
============
You need to implement a class that implements the ``` IHandle<T> ```	interface.

An example is below:
```	
	public class NewsletterSignupEventHandler : IHandle<NewsletterSignupEvent>
    {
        private static ILog Log = LogManager.GetLogger<StandardMembershipProvider>();
        public void Handle(NewsletterSignupEvent @event)
        {
            Log.Info(string.Format("Newsletter sign up: {0}", @event.EmailAddress));
         
			//Send to CRM

        }

```	

Events are not distributed ( no service bus), so they are executed on the server that raises them. However, you could chnage this if you changed the implementation of ```	IEventNotifier ```.