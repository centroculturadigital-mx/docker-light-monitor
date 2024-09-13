#!/bin/bash

# Function to make GraphQL queries
graphql_query() {
    local query="$1"
    local variables="$2"
    curl --request POST \
         --header 'content-type: application/json' \
         --url 'http://localhost:3000/api/graphql' \
         --data "{\"query\":\"$query\",\"variables\":$variables}"
}

# Fetch containers
fetch_containers() {
    local query="query { projects { id title container } }"
    graphql_query "$query" "{}"
}

# Get container stats
get_container_stats() {
    local container_id="$1"
    local cpu_usage=$(docker stats --no-stream --format "{{.CPUPerc}}" "$container_id" | sed 's/%//g')
    local mem_usage=$(docker stats --no-stream --format "{{.MemPerc}}" "$container_id" | sed 's/%//g')
    echo "{\"cpu\":$cpu_usage,\"ram\":$mem_usage}"
}

# Save metrics
save_metrics() {
    local cpu="$1"
    local ram="$2"
    local project_id="$3"
    local query="mutation(\$data: MetricCreateInput!) { createMetric(data: \$data) { id cpu ram createdAt } }"
    local variables="{\"data\":{\"cpu\":$cpu,\"ram\":$ram,\"project\":{\"connect\":{\"id\":\"$project_id\"}}}}"
    graphql_query "$query" "$variables"
}


# Main script
main() {
    # Fetch containers
    echo "fetching projects"
    containers=$(fetch_containers)
    echo "containers: $containers"
    # Extract container data using jq
    echo "$containers" | jq -c '.data.projects[]' | while read -r container; do
        id=$(echo "$container" | jq -r '.id')
        title=$(echo "$container" | jq -r '.title')
        container_id=$(echo "$container" | jq -r '.container')
        
        # Get container stats
        stats=$(get_container_stats "$container_id")
        cpu=$(echo "$stats" | jq -r '.cpu')
        ram=$(echo "$stats" | jq -r '.ram')
        
        # Save metrics
        result=$(save_metrics "$cpu" "$ram" "$id")
        
        # echo $stats
        
        echo "Saved project: $result"
    done
}

# Run the main script
main
