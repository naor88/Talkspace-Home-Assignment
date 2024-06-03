# TalkSpace Home Assignment

The task is at docs\task

The rest of the code include the Code Review Changes


The Code Review Notes:
  Code Review - General notes:
  - The file is at ".ts" but a lot of type errors
  - The code is in one file and not split into logic sections like config\modules\controls\services\utils\tests
  - No use at sequelize-typescript package and types of other libraries
  - No "package.json" file to the project
  - No "tsconfig.json" file to the project
  - DB connection info is plan text is better to use environment variable and also more secure  
  - The code should have better error handling and logging to make debugging easier.  
  Code Review - Code related notes:
  - The function executeQuery not in used so i believe we can remove it (i never worked with sequelize  but it's look like sequelize.getConnection() is not the way and sequelize.query need to take place there)
  - The function input params of getStats missing type declaration. need to be (providerId: string)
  - The function input params of getCreditsUsedStats missing type declaration. need to be (providerId: string)[sequelize.Op.or] -> need to fix import { Op } from 'sequelize' and then use like [Op.or] (At 3 places in the code)
  - At line 217 we set the credit for the booking and maybe we can pass it at line 210 when we create the booking
  - At line 213 creation of  BookingStatusHistory the status is not defined but need to be the booking.status and the bookingId need just be booking so something like:await BookingStatusHistory.create({ status: booking.getDataValue('status'), booking });
  - Because this if (bookings?.[0].provider === userId) i't look like the statistics will return just if the first booking the provider is this user id and the getState function handle the case the user don't have any booking as a provider by using or zero operation so i'm believe we can remove the if and just call getState with the userId and also use const for the state (after changes:const stats = await getStats(userId.toString());)


