# KiasuGrocer

## Inspiration
The COVID-19 pandemic highlighted the need for sustainable solutions. With the ongoing food waste in supermarkets and FnB outlets, we were inspired to create "Kiasu Grocer." Our goal was to connect customers and vendors, allowing them to reduce waste by offering discounted perishable products.

## What it does
"Kiasu Grocer" is a platform that enables vendors to list perishing or expiring products at discounted prices. Using geolocation, customers can locate nearby vendors such as supermarkets and view their available discounted items. They can then make purchases, minimizing food and product waste while promoting sustainability. Customers get to enjoy discounted prices while Vendors get to increase profits buy selling otherwise discarded products.

## How we built it
We built "Kiasu Grocer" using ReactJS on the frontend, along with TailwindCSS for the UI, providing an intuitive user interface. We utilized 2 geolocation APIs from positionstack.com  and data.gov.sg to fetch nearby supermarkets' data from the user's location. The database that we used is SQLite to handle vendor listings, customer orders, and communication between the two parties.

## Challenges we ran into
There were many challenges revolving around the API calls as sometimes we would get 403 errors from the APIs, preventing us from debugging other aspects of our Web App. 
As we were introduced to asynchronous programming in Java, handling async operations in JS was difficult for us, nevertheless we managed to debug the async errors in time.
Another challenge due to the time-constraint was we were not able to get a fully functional CRUD backend up in time, thus we used some seeded data on the frontend to demonstrate our product. 

## Accomplishments that we're proud of
We successfully developed a functional platform that addresses the problem of food waste by connecting vendors and customers, all in a span of 2 days! We implemented an intuitive user interface, easy-to-use inventory management for vendors and even payment interface. Our accomplishment lies in creating a sustainable solution that benefits both vendors and customers, contributing to a more sustainable post-COVID world.

## What we learned
Throughout the development process, we gained valuable insights into geolocation and real-time data into our project. We also deepened our understanding of user experience design and the importance of sustainable practices. Collaboration and teamwork skills were greatly enhanced through this project as Year 1 students with little background in coding in teams and hackathons.

## What's next for [Bzawannabes] Kiasu Grocer
Moving forward, we aim to develop the Web App fully and expand the platform's reach and impact. We plan to collaborate with actual supermarkets, encouraging them to join our initiative. To go a step further, incorporating machine learning algorithms can help predict and manage inventory more effectively, giving vendors an easier time in listing their products on our Web App. We also envision implementing feedback mechanisms to continuously improve the platform based on user suggestions and needs. Overall, our goal is to create a nationwide network that reduces food and product wastage and fosters sustainable consumption habits.
