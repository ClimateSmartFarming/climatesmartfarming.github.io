---
title: Water Deficit Calculator
description: Estimates current and forecasted water deficit in the effective root zone for specific crops, soil types, and irrigation applications across the Northeast.
category: Water Management
image: /images/tools/water-def-calculator-v4.png
iframeUrl: https://nrcc-cornell.github.io/csf-waterdef-v4
externalLink: https://climatesmartfarming.org/tools/csf-water-deficit-calculator/
repoUrl: https://github.com/nrcc-cornell/csf-waterdef-v4
hasIframe: true
iframeHeight: 850px
toolType: integrated
season: summer
---

###### © Cornell University, 2016. Credits: **Tool Developed by Art DeGaetano & Brian Belcher.**

**Please take a few minutes to fill out a [brief questionnaire](https://cornell.ca1.qualtrics.com/jfe/form/SV_0vc48MwnoVRBq6N) on the CSF tools,** so that we can continue to improve them, and develop new tools that are most needed! The questionnaire is voluntary and confidential, but we appreciate your input!

## How do I use this tool?

View our video tool tutorial on [YouTube](https://youtu.be/9A1F0mCUd8k).

### Instructions on Using the Tool

*Choosing Your Location*

- Click the "Change Location" button, which pops up a dialog box with text field and a map (click the small circle button at the top right to exit if needed)
- Create a new location by 1) entering your address, zip code, county, in the text field and clicking the "GO" button, OR 2) clicking on the map at any location in the Northeast
- The "Confirm Location Information" dialog box will appear after clicking "GO," along with a yellow marker at the new location.
  - Click "Save and Select" when you want to see the graph for your chosen location
  - Click "Save" when the yellow marker is in the correct location, but you want to add more locations (the color of the new symbol will be changed to blue)
  - Click "Cancel" when you do not want to keep the location

*Selecting or Deleting Additional Locations*

- You may select or delete a location from those already shown (upon clicking "Change Location") by hovering and then clicking on an existing symbol once the white box with existing location details has appeared
- The "Confirm Location Information" dialog will appear at the top of the map
  - Click "Select" when you want to see the graph for that location. When the dialog box closes, the color of the selected location's marker will be changed to red, and the color of the previously selected marker will be changed to blue. The dialog box will close and your graph will appear
  - Click "Delete" to delete the location, immediately removing the marker from the map
  - Click "Cancel" when you want to do nothing

*Choosing Your Soil Water Capacity*

- Several soil water capacities are supported. By default, the High (Clay, fine textured) is selected. You may change the current soil water capacity by clicking the drop down menu and selecting either High, Medium, or Low soil water capacity. The graph will immediately update for the new variety (at the current location and date).
- Additionally, several crop types are supported. By default, Grass reference is selected. To change the crop type, select from the variety of different crop types listed in the drop down menu. An info button is available in order to show the varieties included in each crop type group.

*Selecting Your Date of Planting/Budbreak*

- The "Planting/Budbreak" button selects for your "planting" or "greenup" date.
- To select a date, click on the small green calendar to display a larger, interactive calendar from which to choose a date by clicking on it, which will automatically update the graph (switch between months by clicking the small arrow in the top left and right of the calendar pop-up box)

*Selecting Your Last Irrigation Date (if applicable)*

- To select your most recent irrigation date, click on the small green calendar to display a larger, interactive calendar from which to choose a date by clicking on it, which will automatically update the graph (switch between months by clicking the small arrow in the top left and right of the calendar pop-up box)
- Any irrigation amount above field capacity includes some water that is lost to drainage and not used by the plant. Therefore, irrigating to field capacity is done with water conservation in mind, especially for coarse sandy soils where drainage of any water above field capacity occurs over just a few hours.

*Viewing the Displayed Charts*

- Charts are accessible from the buttons in the lower-left corner of the tool. The first button ("Season to Date") shows calculated water deficit for the entire season to date, along with forecasted water deficit for the subsequent 3-day period.
- The second button ("30-Day Outlook") provides historical probabilities of reaching specific soil water content levels over the next 30 days, given the current water deficit.
- The third button ("Climate Change") provides context for how climate change is expected to affect the potential for water deficits by season and crop type in the future.
- Finally, an "Info" button is available to access information about any methods, models or data that are used within this tool.

<a href="http://www.nrcc.cornell.edu/dyn_images/grass/wptot.png" target="_blank" rel="noopener noreferrer"><img src="http://www.nrcc.cornell.edu/dyn_images/grass/wptot.png" alt="Total rainfall over the last 7 days in the Northeastern US" /></a>

The above map is produced using approximately 700 rain gauge sites to show the total rainfall (inches) observed over the last 7 days in the Northeastern US. This map is a product of the [Northeast Regional Climate Center](http://www.nrcc.cornell.edu/), and part of a set of [Moisture Maps](http://www.nrcc.cornell.edu/industry/grass/moisture/moisture.html) developed for the turf grass industry.

**Why is this tool needed?**

The CSF Water Deficit Calculator estimates soil water content within a crop's effective root zone to inform decision makers about current and forecasted water deficits. This information is used by farmers and irrigation system managers to determine the optimum frequency and duration of watering that is necessary to avoid plant stress.

**How does this tool work?**

Crops respond to water deficits in predictable ways at specific, measurable levels of water stress. This tool takes advantage of these relationships to monitor and predict possible water deficit and associated plant stress.

Many factors are at play in creating a proper irrigation schedule. This tool uses the following information to estimate current and forecasted water deficits:

- Historical climatological data
- Forecasted rainfall and evapotranspiration
- Site-specific data that you provide about your farm, including soil type, crop type, planting dates and previous irrigation dates.

With this information, water balance calculations are performed for a soil depth of one foot (the assumed effective root zone of your crop). Precipitation, evapotranspiration, surface runoff and drainage from the root zone are all used to estimate soil water content on a daily basis. Soil water content is then compared to the soil's field capacity to calculate the water deficit for your location. Here, the water deficit is defined as the amount of water necessary to raise the soil water content to field capacity. Color-coding of water deficits reflect the stress that plants may be experiencing at the given deficit amounts. Daily forecasted data are also used to forecast water deficits over subsequent days in a similar manner for planning purposes.

Water deficit probabilities over the next 30 days are calculated from historical data (2002-present). Using the current water deficit as model initialization together with historically observed weather during similar seasons, the water balance calculations are executed on historical data to determine the probability of observing water deficit amounts over the subsequent month.

**Producers can use this tool to:**

- Plan your water applications with a goal of minimizing plant stress while maximizing water conservation.
- Assess the probability of naturally reaching certain levels of soil water content over the next month.

<a href="http://www.nrcc.cornell.edu/dyn_images/grass/wdfct.png" target="_blank" rel="noopener noreferrer"><img src="http://www.nrcc.cornell.edu/dyn_images/grass/wdfct.png" alt="Difference between weekly rainfall and evapotranspiration" /></a>

The above map shows the difference between weekly rainfall and evapotranspiration (the sum of evaporation and plant transpiration). Negative values indicate that evapotranspiration exceeded precipitation. This map is useful in assessing water loss for irrigation purposes. The map is a product of the [Northeast Regional Climate Center](http://www.nrcc.cornell.edu/), and part of a set of [Moisture Maps](http://www.nrcc.cornell.edu/industry/grass/moisture/moisture.html) developed for the turf grass industry.

**Usage example: An economic case study in Vermont**

The CSF Water Deficit Calculator was used during [an economic case study on the benefits of irrigation at Intervale Community Farm (ICF) in Vermont](https://www.uvm.edu/sites/default/files/media/IrrigationCaseStudy_Feb2018_cmyk_bleed.pdf). In this case study the authors used this tool, along with ICF records, to estimate when plant stress likely occurred due to soil water deficits over the past couple of decades at this farm.

Consider exploring data from previous years in this tool to discover how irrigation may have alleviated plant stress, and increased profits, on *your* farm:

1. Simply select a planting date from a previous year and you are presented with estimates of water deficits and plant stress throughout that entire growing season.
2. Select irrigation dates to view the potential benefits of water applications during dry periods in that season.

