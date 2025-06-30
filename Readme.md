How to use the new setup:
Make sure your certificates are properly generated:

```
./create_root_cert.sh
```

Build and start your application with the new script:
```
./build-and-start.sh
```
The script will build your application first and then start the Docker containers. If the build fails, it will show you the errors so you can fix them before starting the containers.

Your application should now be accessible at:

https://localhost
https://127.0.0.1
https://192.168.10.113

Remember to install the root CA certificate in your browser to avoid SSL warnings.