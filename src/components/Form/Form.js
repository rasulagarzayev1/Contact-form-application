import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Dropdown, Button, Header, Image, Modal } from "semantic-ui-react";
import axios from "axios";
import { ErrorMessage } from "@hookform/error-message";
import apiKey from "../../keys/emailkey";
import emailjs from "emailjs-com";

import "../../assets/scss/style.scss";

const Form = () => {
  const [countries, setCountries] = useState([]);
  const [industry, setIndustry] = useState("");
  const [country, setCountry] = useState("");
  const [opgeography, setOpGeography] = useState("");
  const [countryError, setCountryError] = useState("");
  const [industryError, setIndustryError] = useState("");
  const [opGeoError, setOpGeoError] = useState("");
  const [open, setOpen] = React.useState(false);

  //useForm() hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //Form submit handler
  const onSubmit = (data, e) => {
    //Chek country and industry name selection
    if (industry === "" || country === "") {
      e.preventDefault();
      industry === ""
        ? setIndustryError("Please select industry")
        : setCountryError("Please select country");
    } else {
      //Send email form message
      emailjs
        .sendForm(
          apiKey.SERVICE_ID,
          apiKey.TEMPLATE_ID,
          e.target,
          apiKey.USER_ID
        )
        .then(
          (result) => {
            setOpen(true);
          },
          (error) => {
            alert("Something going wrong please try later");
          }
        );
    }
  };

  //Get selected value of industry name dropdown
  const handleIndustryDropdown = (event, data) => {
    setIndustry(data.value);
    setIndustryError("");
  };

  //Get selected value of country name dropdown
  const handleCountryDropdown = (event, data) => {
    setCountry(data.value);
    setCountryError("");
  };

  //Get selected value of Operation Geography name dropdown
  const handleOpGeographyDropdown = (event, data) => {
    setOpGeography(data.value);
    setOpGeoError("");
  };

  //Values of operation geography list
  const opGeographies = [
    {
      key: "National",
      value: "National",
      text: "National",
    },
    {
      key: "Regional",
      value: "Regional",
      text: "Regional",
    },
    {
      key: "Global",
      value: "Global",
      text: "Global",
    },
  ];

  //Values of industry list
  const industries = [
    {
      key: "Automative",
      value: "Automative",
      text: "Automative",
    },
    {
      key: "Consulting",
      value: "Consulting",
      text: "Consulting",
    },
    {
      key: "Finance",
      value: "Finance",
      text: "Finance",
    },
    {
      key: "Healthcare",
      value: "Healthcare",
      text: "Healthcare",
    },
    {
      key: "Media/PR",
      value: "Media/PR",
      text: "Media/PR",
    },
    {
      key: "Retail",
      value: "Retail",
      text: "Retail",
    },
    {
      key: "Technology",
      value: "Technology",
      text: "Technology",
    },
    {
      key: "Telecommunication",
      value: "Telecommunication",
      text: "Telecommunication",
    },
    {
      key: "Other",
      value: "Other",
      text: "Other",
    },
  ];

  //Get country list from API and set data to country list
  axios.get(`https://restcountries.eu/rest/v2/all`).then((response) => {
    if (response.data) {
      setCountries(
        response.data.map((c) => ({
          key: c.alpha2Code,
          value: c.alpha2Code,
          flag: c.alpha2Code.toLowerCase(),
          text: c.name,
        }))
      );
    }
  });

  return (
    <div className="formPart">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="personalInfo">
          <div className="leftForm">
            <label htmlFor="firstname">First name*</label>
            <br />
            <input
              {...register("firstname", {
                required: "You must enter firstname",
                minLength: 3,
                pattern: /^[A-Za-z]+$/,
              })}
            />
            <br />
            <ErrorMessage
              errors={errors}
              name="firstname"
              render={({ message }) => (
                <span className="errorMessage">{message}</span>
              )}
            />
            <br />
            <label htmlFor="email">Email*</label>
            <br />
            <input
              {...register("email", {
                required: "You must enter email",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Please enter email with correct format",
                },
              })}
            />
            <br />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => (
                <span className="errorMessage">{message}</span>
              )}
            />
          </div>
          <div className="distanceBalance"></div>

          <div className="rightForm">
            <label htmlFor="lastname">Last name</label>
            <br />
            <input
              type="text"
              {...register("lastname", {
                minLength: {
                  value: 3,
                  message: "Lastname must contain at least 3 letters",
                },
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "Lastname must contain only letters",
                },
              })}
            />
            <br />
            <ErrorMessage
              errors={errors}
              name="lastname"
              render={({ message }) => (
                <span className="errorMessage">{message}</span>
              )}
            />
            <br />
            <label htmlFor="jobtitle">Job title</label>
            <br />
            <input
              type="text"
              {...register("jobtitle", {
                minLength: {
                  value: 2,
                  message: "Job title must contain at least 2 letters",
                },
              })}
            />
            <br />
            <ErrorMessage
              errors={errors}
              name="jobtitle"
              render={({ message }) => (
                <span className="errorMessage">{message}</span>
              )}
            />
            <br />
          </div>
        </div>
        <div className="busineessInfo">
          <div className="leftForm">
            <label htmlFor="company">Company*</label>
            <br />
            <input
              type="text"
              {...register("company", {
                required: "You must enter company name",
              })}
            />
            <br />
            <ErrorMessage
              errors={errors}
              name="company"
              render={({ message }) => (
                <span className="errorMessage">{message}</span>
              )}
            />
            <br />
            <label htmlFor="industry">Country*</label>
            <br />
            <Dropdown
              placeholder="Select Country"
              fluid
              search
              selection
              onChange={handleCountryDropdown}
              options={countries}
            />
            <br />
            <input
              type="hidden"
              defaultValue={country}
              {...register("country")}
            />

            <span className="errorMessage">{countryError}</span>

            <br />
          </div>
          <div className="distanceBalance"></div>
          <div className="rightForm">
            <label htmlFor="industry">Industry*</label>
            <br />
            <Dropdown
              placeholder="Select Industry Type"
              fluid
              search
              selection
              onChange={handleIndustryDropdown}
              options={industries}
            />
            <input
              type="hidden"
              defaultValue={industry}
              {...register("industry")}
            />
            <br />
            <span className="errorMessage">{industryError}</span>
            <br />

            <label htmlFor="opgeography">Operating geography</label>
            <br />
            <Dropdown
              placeholder="Select Operation Geography"
              fluid
              search
              selection
              onChange={handleOpGeographyDropdown}
              options={opGeographies}
            />
            <input
              type="hidden"
              defaultValue={opgeography}
              {...register("opgeography")}
            />
            <br />
            <span className="errorMessage">{opGeoError}</span>
            <br />
          </div>
        </div>

        <div className="additionalInfo">
          <label htmlFor="message">What would you like to talk about?</label>
          <textarea
            name="message"
            id=""
            rows="6"
            {...register("message")}
          ></textarea>
          <div className="additionalPartWrapper">
            <div className="checkBoxPart">
              <input
                type="checkbox"
                id="privacy"
                {...register("privacy", {
                  required: "You must agree privacy rules",
                })}
              />
              <label htmlFor="privacy">
                By submitting this form I accept{" "}
                <a href="#">privacy policy and cookie policy. </a>
              </label>
              <br />
              <ErrorMessage
                errors={errors}
                name="privacy"
                render={({ message }) => (
                  <span className="errorMessage">{message}</span>
                )}
              />
              <br />
              <input
                type="checkbox"
                name="newsletter"
                id="newsletter"
                {...register("newsletter")}
              />
              <label htmlFor="newsletter">
                I would like to receive your newsletter.
              </label>
            </div>
            <div className="buttonPart">
              <Modal
                onClose={() => setOpen(false)}
                open={open}
                trigger={<Button>Send</Button>}
                type="Submit"
                size="tiny"
              >
                <Modal.Header>Your message was sent sucessfully</Modal.Header>
                <Modal.Content image>
                  <Image
                    size="medium"
                    src="https://www.modularbank.co/static/ec2c09c8d857bcded4246b3da291a8e2/5591c/main-hero.png"
                    wrapped
                  />
                  <Modal.Description>
                    <Header>Thank you for contacting us</Header>
                    <p>
                      We will review your message and will contact you as sson
                      as possible.
                    </p>
                  </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                  <Button
                    content="Ok"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={() => setOpen(false)}
                    positive
                  />
                </Modal.Actions>
              </Modal>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
