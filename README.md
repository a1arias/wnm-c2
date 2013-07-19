c2 is the command and control server.

This provides and api/rpc for controlling probes and performing data analysis. C2 is a headless server that is used by client apps such as webmin.

facilities include: 
* coordinating probe configuration (via pubsub last value caching)
* launching adhoc test