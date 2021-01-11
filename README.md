# testwebpack5issue

Having a problem getting webpack 5 to do code splitting. 

Setup by running npm install to download & install all node modules.

*npm install*

Build the webpack bundles and:

*npm run start*

Now launch a browser and go to page: 
http://localhost:3005/launch

It should load "launch" which redirects to "index" and then displays a message "Page has Loaded". This is WITHOUT code splitting though.

Now, if the webpack.config.common.js is modified and the index entrypoint is modified to include the dependOn directive, bundles will be built but will not run when trying to load index.bundle.js (no message).

If the webpack.config.common.js is modified to uncomment the 'runtimeChunk' or 'splitChunks' optimizations, not even the launch.bundle.js will load.


