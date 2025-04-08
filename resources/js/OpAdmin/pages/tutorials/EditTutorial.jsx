import React, { useEffect, useState } from 'react';
import apiClient from '../../services/api';
import UIkit from 'uikit';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditTutorial() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [tutorialcategrydata, settutorialcategrydata] = useState([]);
    const [formData, setformData] = useState({
        name: '',
        tutorial_video_category_id: '',
        video_url: '',
        thumbnail_url: null,
        image_alt: '',
        description: '',
        content: '',
    });

    const edittutorial = () => {
        apiClient.get(`/tutorial-videos/${id}`)
        .then((res) => {
            setformData(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        gettutorialcategories();
        edittutorial()
    }, [])

    const gettutorialcategories = () => {
        apiClient.get(`/active-tutorial-videos-categories/`)
        .then((res) => {
            console.log(res.data)
            settutorialcategrydata(res.data.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    // Handle text input changes
    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle file input change
    const handleFileChange = (e) => {
        console.log(e.target.files[0])
        setformData({
            ...formData,
            thumbnail_url: e.target.files[0], // Store the first selected file
        });
    }

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Create FormData object
        const data = new FormData();
        data.append("name", formData.name);
        data.append("tutorial_video_category_id", formData.tutorial_video_category_id);
        data.append("video_url", formData.video_url);
        data.append("thumbnail_url", formData.thumbnail_url);
        data.append("image_alt", formData.image_alt);
        data.append("description", formData.description);
        data.append("content", formData.content);
        data.append("_method", 'PUT');

        // Log to console (for debugging)
        console.log("Form Data:", Object.fromEntries(data));

        // API Call (Optional)
        apiClient.post(`/tutorial-videos/${id}`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then(response => {
            console.log("Success:", response.data);
            navigate('/op-admin/tutorials')
            UIkit.notification({
                message: "Blog created successfully!",
                status: "success",
                timeout: 2000,
                pos: "top-center",
            });
        })
        .catch(error => {
            console.error("Error:", error);
            UIkit.notification({
                message: error?.response?.data?.message,
                status: "danger",
                timeout: 2000,
                pos: "top-center",
            });
        });
    };

    console.log(formData)

  return (
    <>

        <div id="sc-page-wrapper">
            <div id="sc-page-content">
                <div className="uk-child-width-1-1@l" data-uk-grid>
                    <div>
                        <div className="uk-card">
                            <div className="uk-card-body">
                                <h5 className="uk-heading-line"><span>Add Tutorial</span></h5>
                                <form onSubmit={handleSubmit}>
                                    <fieldset className="uk-fieldset">
                                    <div className="uk-grid uk-grid-small uk-child-width-1-2@l" uk-grid="true">
                                            <div>
                                                <input className="uk-input uk-margin-bottom" type="text" name="name" onChange={handleChange} value={formData.name} placeholder="Tutorial Name" data-sc-input />
                                                <input className="uk-input uk-margin-bottom" type="file" name='thumbnail_url' onChange={handleFileChange} placeholder="Thumnail" data-sc-input />
                                                <input className="uk-input uk-margin-bottom" type="text" name='content' onChange={handleChange} value={formData.content} placeholder="Content" data-sc-input />
                                            </div>
                                            <div>
                                            <select className="uk-select uk-margin-bottom" name='tutorial_video_category_id' onChange={handleChange} value={formData.tutorial_video_category_id} style={{borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderRadius: '0px'}}>
                                                    <option value="">Select a category</option>
                                                    {Array.isArray(tutorialcategrydata) && tutorialcategrydata.length > 0 ? (
                                                        tutorialcategrydata.map((value, index) => (
                                                            <option key={index} value={value._id}>
                                                                {value.name}
                                                            </option>
                                                        ))
                                                    ) : (
                                                        <option disabled>No categories available</option>
                                                    )}
                                                </select>
                                                <input className="uk-input uk-margin-bottom" type="text" name='video_url' onChange={handleChange} value={formData.video_url} placeholder="Video Url" data-sc-input />
                                                <input className="uk-input uk-margin-bottom" type="text" name='image_alt' onChange={handleChange} value={formData.image_alt} placeholder="Image Alt" data-sc-input />
                                            </div>
                                        </div>
                                        <div className="uk-margin">
                                                <textarea className="uk-textarea" rows="5" name='description' onChange={handleChange} value={formData.description} placeholder="Discription" data-sc-input></textarea>
                                        </div>
                                        <div className="uk-margin">
                                            <input type='submit' className='sc-button waves-effect waves-button solid-button' value='Submit'></input>
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}
