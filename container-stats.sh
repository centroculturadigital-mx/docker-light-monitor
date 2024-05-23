#!/bin/bash

# Get the current time in the specified format
current_time=$(date +"%Y/%m/%d %H:%M")

# Loop through all containers
for container in $(docker ps --format "{{.Names}}")
do
    # Get CPU and memory usage statistics for the container
    cpu_usage=$(docker stats --no-stream --format "{{.CPUPerc}}" $container | sed 's/%//g')
    mem_usage=$(docker stats --no-stream --format "{{.MemPerc}}" $container | sed 's/\/.*//')

    # Append the time and statistics to the container's file
    echo "$current_time CPU: $cpu_usage% MEM: $mem_usage" >> logs/"$container.log"
done
