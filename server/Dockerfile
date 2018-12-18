FROM python:3.6-slim as builder

COPY sources.list /etc/apt/sources.list
RUN apt-get update && \
    apt-get install -y build-essential && \
    apt-get clean

COPY requirements.txt /opt/app/requirements.txt
WORKDIR /opt/app
RUN python -m venv venv && \
    . venv/bin/activate && \
    pip install -i https://pypi.tuna.tsinghua.edu.cn/simple -r requirements.txt


FROM python:3.6-slim

ENV PYTHONUNBUFFERED 1
EXPOSE 80
WORKDIR /opt/app
COPY --from=builder /opt/app /opt/app
COPY lib /opt/app/lib
COPY server.py /opt/app/server.py

CMD venv/bin/python server.py
