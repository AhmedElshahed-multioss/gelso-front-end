# Project Template for Odoo projects

## Description
This is a docker-based project template for Odoo projects. It is based on the official Odoo docker image and uses docker-compose to manage the services.
### Services
- Odoo (web)
  - Python Container which runs Odoo server 
- PostgreSQL (db)
  - Database container for Odoo
- MailHog (mailhog)
  - SMTP server for testing email functionality

## Setup
### Prerequisites
- Docker
- Docker Compose
- Git
- Python
- Pip

### Setup
1. Create a new directory. This directory will contain the odoo source code and all projects from our customers.
2. Clone the odoo source code (odoo-16, odoo-17, odoo-enterprise-16, odoo-enterprise-17, [and any other version that is currently used]) into the directory. Should look like this:
   - project-directory-name:
     - odoo-16
     - odoo-17
     - odoo-boilerplate
     - odoo-enterprise-16
     - odoo-enterprise-17
     - ...
     - CustomerProject1 (directly cloned from the customer's repository)
       - The customer's project files
       - ...
     - ...
3. Open the project directory in PyCharm

### Installation
1. Run `bash install-requirements.sh`
2. Rename the `docker-compose.local.yaml` file to `docker-compose.yaml`
3. Edit the mounts where necessary (This will not be necessary, if the setup was done and the directory structure is as described in the prerequisites)
4. Run `docker-compose up -d`
5. If it's a customer project, run `bash set-user-password.sh` and use "test" as the password. This will set the admin password to "test".
6. Open the browser and navigate to `http://localhost:8069`, there enter the required information to create a new database (just use odoo or test everywhere)
7. To create a new module run `docker-compose exec web odoo scaffold <module-name> /mnt/custom-addons`

## Debugging (PyCharm Professional Edition)

This project is capable of debugging Odoo using PyCharm. To do so, follow the steps below:
1. Create a new Python Remote Debug configuration in PyCharm
   - https://www.jetbrains.com/help/pycharm/remote-debugging-with-product.html Python remote debug server configuration
   - Port: 8889
   - Hostname: host.docker.internal
   - Path mappings: the absolute paths on the local machine to the paths in the container (see docker-compose.yaml for these paths)
     - `should be absolute: ...odoo-enterprise-17=/mnt/enterprise-addons`
     - `should be absolute: ...odoo-17/odoo=/usr/lib/python3/dist-packages/odoo`
     - `should be absolute: ...odoo-17/addons=/usr/lib/python3/dist-packages/odoo/addons`
     - `should be absolute: ...custom-addons=/mnt/custom-addons`
     - `should be absolute: ...multioss-addons=/mnt/multioss-addons`
     - `should be absolute: ...3rd-party-addons=/mnt/3rd-party-addons`
3. Run the debug configuration
4. Start Odoo with `docker-compose up -d` or restart the web service with `docker-compose restart web`
5. Add breakpoints in the code
