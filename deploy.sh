#!/bin/bash

# Telegram Mini App Deployment Script
# Usage: ./deploy.sh [options]
# Options:
#   --full    Full rebuild (no cache)
#   --logs    Show logs after deployment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Server configuration
SERVER_IP="95.216.218.185"
SERVER_USER="root"
SSH_KEY="$HOME/.ssh/developer_abbasaghaa_key"
REMOTE_DIR="/opt/tg-miniapp"
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Check if SSH key exists
if [ ! -f "$SSH_KEY" ]; then
    echo -e "${RED}❌ SSH key not found at $SSH_KEY${NC}"
    exit 1
fi

echo -e "${GREEN}🚀 Starting deployment to QA server...${NC}\n"

# Step 1: Sync files
echo -e "${YELLOW}📦 Syncing files to server...${NC}"
rsync -avz \
    --exclude 'node_modules' \
    --exclude '.next' \
    --exclude '.git' \
    --exclude '*.mov' \
    --exclude 'developer_abbasaghaa_key' \
    --exclude 'cypress' \
    --exclude 'tsconfig.tsbuildinfo' \
    --exclude 'package-lock.json' \
    --exclude 'deploy.sh' \
    -e "ssh -i $SSH_KEY" \
    "$PROJECT_DIR/" "$SERVER_USER@$SERVER_IP:$REMOTE_DIR/"

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to sync files${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Files synced successfully${NC}\n"

# Step 2: Build and deploy
if [ "$1" == "--full" ]; then
    echo -e "${YELLOW}🔨 Building Docker image (full rebuild)...${NC}"
    ssh -i "$SSH_KEY" "$SERVER_USER@$SERVER_IP" \
        "cd $REMOTE_DIR && docker compose down && docker compose build --no-cache && docker compose up -d"
else
    echo -e "${YELLOW}🔨 Building Docker image...${NC}"
    ssh -i "$SSH_KEY" "$SERVER_USER@$SERVER_IP" \
        "cd $REMOTE_DIR && docker compose build && docker compose up -d"
fi

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Deployment failed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Container started successfully${NC}\n"

# Step 3: Check status
echo -e "${YELLOW}📊 Checking deployment status...${NC}"
ssh -i "$SSH_KEY" "$SERVER_USER@$SERVER_IP" \
    "docker ps | grep tg-miniapp"

# Step 4: Wait for health check
echo -e "\n${YELLOW}⏳ Waiting for application to be healthy...${NC}"
sleep 5

# Test application
echo -e "${YELLOW}🧪 Testing application...${NC}"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://$SERVER_IP/fa/home)

if [ "$HTTP_CODE" == "200" ]; then
    echo -e "${GREEN}✅ Application is healthy (HTTP $HTTP_CODE)${NC}\n"
else
    echo -e "${RED}❌ Application returned HTTP $HTTP_CODE${NC}\n"
fi

# Show deployment info
echo -e "${GREEN}🎉 Deployment completed!${NC}\n"
echo -e "📍 Access URLs:"
echo -e "   Main: ${GREEN}http://$SERVER_IP/${NC}"
echo -e "   Persian: ${GREEN}http://$SERVER_IP/fa/home${NC}"
echo -e "   English: ${GREEN}http://$SERVER_IP/en/home${NC}"
echo -e "   Direct: ${GREEN}http://$SERVER_IP:3001/${NC}"

# Show logs if requested
if [ "$1" == "--logs" ] || [ "$2" == "--logs" ]; then
    echo -e "\n${YELLOW}📋 Application logs:${NC}"
    ssh -i "$SSH_KEY" "$SERVER_USER@$SERVER_IP" \
        "docker logs tg-miniapp --tail 30"
fi

echo -e "\n${YELLOW}💡 Useful commands:${NC}"
echo -e "   View logs: ${GREEN}ssh -i $SSH_KEY $SERVER_USER@$SERVER_IP 'docker logs tg-miniapp -f'${NC}"
echo -e "   Restart: ${GREEN}ssh -i $SSH_KEY $SERVER_USER@$SERVER_IP 'cd $REMOTE_DIR && docker compose restart'${NC}"
echo -e "   Stop: ${GREEN}ssh -i $SSH_KEY $SERVER_USER@$SERVER_IP 'cd $REMOTE_DIR && docker compose down'${NC}"

