FROM python:3.6-slim as builder

COPY docker/sources.list /etc/apt/sources.list
RUN apt-get update && \
    apt-get install -y build-essential && \
    apt-get clean

COPY server/requirements.txt /opt/app/requirements.txt
WORKDIR /opt/app
RUN python -m venv venv && \
    . venv/bin/activate && \
    pip install -i https://pypi.tuna.tsinghua.edu.cn/simple -r /opt/app/requirements.txt


FROM python:3.6-slim

EXPOSE 80
COPY --from=builder /opt/app /opt/app
COPY server/server.py /opt/app/server.py

CMD /opt/app/venv/bin/python /opt/app/server.py
