name: aaa2

on:
  workflow_dispatch:
  schedule:
     - cron: '0 0 29 2 *'
  watch:
    types: started
jobs:
  build:
    runs-on: ubuntu-latest
    if: github.event.repository.owner.id == github.event.sender.id
    env:
        BBB_bububaoTOKEN: ${{ secrets.BBB_bububaoTOKEN }}
        BBB_CASH: ${{ secrets.BBB_CASH }}    
        
    steps:
      - name: Checkout
        run: |
          git clone https://github.com/HH97108/99.git ~/99
      - name: Use Node.js 12.x
        uses: actions/setup-node@v1
        with:
          node-version: 12.x
      - name: npm install
        if: env.BBB_bububaoTOKEN
        run: |
          cd ~/99
          git checkout ZIYE
          npm install
      - name: '运行 【步步宝】'
        if: env.BBB_bububaoTOKEN
        run: |
          cd ~/99
          node Task/aaa2.js
        env:
          
          PUSH_KEY: ${{ secrets.PUSH_KEY }}
          BARK_PUSH: ${{ secrets.BARK_PUSH }}
          TG_BOT_TOKEN: ${{ secrets.TG_BOT_TOKEN }}
          TG_USER_ID: ${{ secrets.TG_USER_ID }}
          BARK_SOUND: ${{ secrets.BARK_SOUND }}
          DD_BOT_TOKEN: ${{ secrets.DD_BOT_TOKEN }}
          DD_BOT_SECRET: ${{ secrets.DD_BOT_SECRET }}
