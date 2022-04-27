# Udagram Image Filtering Microservice (project 2)
## requrement
- ts-node: version 8.3.0
- typescript: version 3.5.3

## run script in local
- npm i
- npm run dev
- Then server running http://localhost:8082


## deploy elasticbeanstalk
- eb init
- npm run build
- eb create

## elasticbeanstalk endpoint
- endpoint: http://image-filter-service-dev.us-east-1.elasticbeanstalk.com/
- you can test the endpoint by runing the url: http://image-filter-service-dev.us-east-1.elasticbeanstalk.com/filteredimage/?image_url=https://picsum.photos/200

