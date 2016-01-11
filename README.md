# Zendesk-VersionOne-Defect-App
Zendesk App To Get Values of Defects and User Stories based on value of custom ticket field in Zendesk.

## Table of Contents
- [Install](https://github.com/mzelmanovich/Zendesk-VersionOne-Defect-App#install)
- [Settings](https://github.com/mzelmanovich/Zendesk-VersionOne-Defect-App#settings)
- [Screenshots](https://github.com/mzelmanovich/Zendesk-VersionOne-Defect-App#screenshots)
- [Statuses](https://github.com/mzelmanovich/Zendesk-VersionOne-Defect-App#statues)

## Install
Install by using Zendesk's [ZAT tool](https://developer.zendesk.com/apps/docs/agent/tools) to package app and upload. Steps are provided in Zendesk's *[Building Your First Zendesk App](https://support.zendesk.com/hc/en-us/articles/203691296)* tutorial.

## Settings
#### Title:
Title of app in Zendesk App Manger.

#### appName:
Name of app in Zendesk ticket view side bar.

#### apiToken:
Token provided by VersionOne to access their API.

#### baseURL:
Url of version being used. Generally follows this format: **https://www5.v1host.com/companyName**

## Screenshots
#### Settings:
![Settings field](https://github.com/mzelmanovich/Zendesk-VersionOne-Defect-App/blob/master/screenshots/settings.JPG?raw=true)


#### Ticket View:
![App Screen Shot](https://github.com/mzelmanovich/Zendesk-VersionOne-Defect-App/blob/master/screenshots/app.JPG?raw=true)

## Statuses
Most statues used by this app follow what is outline by [VersionOne](https://community.versionone.com/Help-Center/Common-Questions/Getting_Started_with_the_API). The following are exceptions added to fit my needs.

* Released - Defect/Story is closed and not Declined. Assumed that it was released
* Queued - Defect/Story was created but has no status currently
* Active - Catch all status for In Progress. Done for CSS reasons

## ToDo:

* Fix CSS for Long Statuses
* Better CSS colors for Statues
