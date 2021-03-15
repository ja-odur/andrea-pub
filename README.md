# andrea

Andrea is an online code compilation platform built with Python/Django and ReactJS. Currently available languages are; C++, 
Golang, NodsJS and Python.

## Dependencies

- [Docker](https://www.docker.com/)
- [Python 3](https://www.python.org/)
- [PostgreSQL](https://www.postgresql.org/)

## Set Up (local)

The application is dockerized but requires some environment variables

##### Env variables

create a `.env` file in the application's root directory. The keys of the file are described below.

| Env key                 | Sample/Default value | Description               |
| ------------------------ | ------ | ------------------------- |
| `DATABASE_URL`          | `postgresql://docker:docker@db:5432/puzzled`   | This url points to the dockerized postgresSQL instance            |
| `REACT_APP_BASE_URL`          | `http://localhost:8000/`    | The default Django url/port       |
| `REACT_APP_BASE_STATIC_URL` | `http://localhost:3000/`   | The configured webpack server url for static files |
| `SSH_BASE_URL`    | `host.docker.internal` | docker-compose equivalent of localhost on macOS or windows |
| `PYTHON_SSH_HOST_PORT` | _   | Unique port number for the Python interpreter server |
| `NODE_SSH_HOST_PORT` | _   | Unique port number for the Node interpreter server |
| `GO_SSH_HOST_PORT` | _   | Unique port number for the Golang compiler server |
| `CPP_SSH_HOST_PORT` | _   | Unique port number for the C++ GNU compiler server |
| `SSH_USER` | _   | The SSH username that will be used to login (ssh) into the compiler/interpreter servers |
| `SSH_USER_PASSWORD` | _  | The password that will be used during the ssh login |
| `GOPATH` | `/usr/local/go/bin` | The path to install Golang |
| `TIMEOUT` | `120`   | The maximum allowed running time of code be it's timed-out |


##### building and running application

- To build the app `docker-compose build`

- To start the app `docker-compose up`

## Author(s)
- J. A. Odur
