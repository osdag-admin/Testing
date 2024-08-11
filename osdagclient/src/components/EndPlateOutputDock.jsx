import React from 'react'
import { useState } from 'react';
import { Input, Modal,Row,Col } from 'antd';
import spacingIMG from '../assets/endplate_spacing.png'
import capacityIMG1 from '../assets/L_shear1.png'
import capacityIMG2 from '../assets/L.png'
const placeholderOutput = {
	Bolt: [
		{
			label: "Diameter (mm)",
			val: 0
		},
		{
			label: "Property Class",
			val: 0
		},
		{
			label: "shear Capacity (KN)",
			val: 0
		},
		{
			label: "Bolt Force (KN)",
			val: 0
		},
		{
			label: "Bolt Column (nos)",
			val: 0	
		},
		{
			label: "Bolt Rows (nos)",
			val: 0
		}
	],
	Plate: [
		{
			label: "Thickness (mm)",
			val: 0
		},
		{
			label: "Height (mm)",
			val: 0
		},
		{
			label: "Length (mm)",
			val: 0
		}
	],
	Weld: [
		{
			label: "Size (mm)",
			val: 0
		},
		{
			label: "Strength (N/mm2)",
			val: 0
		},
		{
			label: "Stress (N/mm)",
			val: 0
		}
	]
}


const platePopUpFields = ['Shear Yielding Capacity (kN)', 'Rupture Capacity (kN)', 'Block Shear Capacity (kN)', 'Tension Yielding Capacity (kN)', 'Tension Rupture Capacity (kN)', 'Axial Block Shear Capacity (kN)', 'Moment Demand (kNm)', 'Moment Capacity (kNm)','Moment Demand per Bolt (kNm)','Moment Capacity per Bolt (kNm)']
const boltPopUpFields = ['Pitch Distance (mm)', 'End Distance (mm)', 'Edge Distance (mm)','Gauge Distance (mm)']

const EndPlateOutputDock = ({ output }) => {

	const [BoltspacingModel, setBoltSpacingModel] = useState(false);
	const [PlatecapacityModel, setPlateCapacityModel] = useState(false);

	// console.log('output : ' , output, output && Object.keys(output).length)
	const handleDialogSpacing = (value) => {
		if (value === 'BoltSpacing') {
			setBoltSpacingModel(true);
		} else if (value === 'PlateCapacity') {
			setPlateCapacityModel(true);
		} else {
			setBoltSpacingModel(false);
			setPlateCapacityModel(false);
		}
		};

	// console.log(output)

	return (
		<div>
			<h5>Output Dock</h5>
			<div className='subMainBody scroll-data'>
				{(output && Object.keys(output).length) ? Object.keys(output).map((key, index) => {
					return (
						<>
							<div key={index}>
								<h3>{key}</h3>
								<div >
									{Object.values(output[key]).map((elm, index1) => {
										console.log(elm)
										if(key == "Plate" && platePopUpFields.includes(elm.label))
											return (<></>)
										else if(key == "Bolt" && boltPopUpFields.includes(elm.label))
											return (<></>)
										return (
											<div key={index1} className='component-grid'>
												<div>
													<h4>{elm.label}</h4>
												</div>
												
												<div>
													<Input
														type="text"
														style={{ color: 'rgb(0 0 0 / 67%)', fontSize: '12px', fontWeight: '500' }}
														name={`${key}_${elm.lable}`}
														value={elm.val}
														disabled
													/>
												</div>
												{(key == "Bolt" && index1 == (Object.values(output[key])?.length-1)) &&
												<>
												<div>
													<h4>Capacity Details</h4>
												</div>
												<div>
													<Input className='btn' 
													type="button" 
													value='details'
													onClick={() => handleDialogSpacing(key === "Bolt" ? "Spacing" : "Capacity")}/>
												</div> 
												<div>
													<h4>Spacing</h4>
												</div>
												<div>
													<Input className='btn' 
													type="button" 
													value="Spacing details"
													onClick={() => handleDialogSpacing("BoltSpacing")}/>
												</div> 
												</>}
												{(key == "Plate" && index1 == (Object.values(output[key])?.length-1)) &&
												<>
												<div>
													<h4>Capacity</h4>
												</div>
												<div>
													<Input className='btn' 
													type="button" 
													value='Capacity details'
													onClick={() => handleDialogSpacing("PlateCapacity")}/>
												</div>
												</>}
											</div>
										);
									})}
								</div>
							</div>
							
						</>);
				}) :
					<div>
						{Object.keys(placeholderOutput).map((key, index) => {
							return (
								<>
									<div key={index}>
										<h3>{key}</h3>
										<div >
											{Object.values(placeholderOutput[key]).map((elm, index1) => {
												if(key == "Plate" && platePopUpFields.includes(elm.label))
													return (<></>)
												else if(key == "Bolt" && boltPopUpFields.includes(elm.label))
													return (<></>)
												return (
													<div key={index1} className='component-grid' style={{userSelect: 'none'}}>
														<div>
															<h4>{elm.label}</h4>
														</div>
														<div>
															<Input
																type="text"
																style={{ color: 'rgb(0 0 0 / 67%)', fontSize: '12px', fontWeight: '500' }}
																name={`${key}_${elm.lable}`}
																value={' '}
																disabled
															/>
														</div>
														{(key !== "Weld" && index1 == (Object.values(placeholderOutput[key])?.length-1)) &&
														<>
														<div>
															<h4>{key == "Bolt" ? "Spacing" : "Capacity"}</h4>
														</div>
														<div>
															<Input
																className='btn'
																type="button"
																value={key === "Bolt" ? "Spacing" : "Capacity"}
																// onClick={() => handleDialogSpacing(key === "Bolt" ? "Spacing" : "Capacity")}
																disabled
															/>

														</div> 
														</>}
													</div>
												);
											})}
										</div>
									</div>
									{
								
							}
								</>);
						})}
					</div>}
			</div>

				{/* Plate capacity details  */}
				<Modal
				visible={PlatecapacityModel}
				onCancel={() => setPlateCapacityModel(false)}
				footer={null}
				width= {'70vh'}
				style={{ maxHeight: '800px', overflow: 'auto' }}
                bodyStyle={{ padding: '20px' }}
				>
					<>
						<div
						style={{
							textAlign: 'center',
							// backgroundColor: 'black',
							// color: 'white',
							// padding: '10px'
						}}
						>
						<h3>Capacity Details</h3>
						</div>
						
						
						<div >
							<div className='spacing-left-body'>
								<div>
									<h4>Shear Yielding Capacity (kN)</h4>
								</div>
								<div>
									<Input
										type="text"
										style={{ color: 'rgb(0 0 0 / 67%)', fontSize: '12px', fontWeight: '500',margin:'15px' }}
										readOnly={true}
										value= {(output && output.Plate && output?.Plate[output?.Plate.findIndex(val => val.label == "Shear Yielding Capacity (kN)")]?.val) || "0"}
									/>
								</div>
								<div>
									<h4>Block Shear Capacity (kN)</h4>
								</div>
								<div>
									<Input
										type="text"
										style={{ color: 'rgb(0 0 0 / 67%)', fontSize: '12px', fontWeight: '500',margin:'15px'  }}
										readOnly={true}
										value= {(output && output.Plate && output?.Plate[output?.Plate.findIndex(val => val.label == "Block Shear Capacity (kN)")]?.val) || "0"}
									/>
								</div>
								<div>
									<h4>Moment Demand per Bolt (kNm)</h4>
								</div>
								<div>
									<Input
										type="text"
										style={{ color: 'rgb(0 0 0 / 67%)', fontSize: '12px', fontWeight: '500',margin:'15px'  }}
										readOnly={true}
										value= {(output && output.Plate && output?.Plate[output?.Plate.findIndex(val => val.label == "Moment Demand per Bolt (kNm)")]?.val) || "0"}
									/>
								</div>
								<div>
									<h4>Moment Capacity per Bolt (kNm)</h4>
								</div>
								<div>
									<Input
										type="text"
										style={{ color: 'rgb(0 0 0 / 67%)', fontSize: '12px', fontWeight: '500',margin:'15px'  }}
										readOnly={true}
										value= {(output && output.Plate && output?.Plate[output?.Plate.findIndex(val => val.label == "Moment Capacity per Bolt (kNm)")]?.val) || "0"}
									/>
								</div>


							
							</div>
							

						</div>
{/*  */}
					</>
				</Modal>
				{/* Capacity */}
				<Modal
				visible={BoltspacingModel}
				onCancel={() => setBoltSpacingModel(false)}
				footer={null}
				width= {'100vh'}
				>
					<>
						<div
						style={{
							textAlign: 'center',
							// backgroundColor: 'black',
							// color: 'white',
							// padding: '10px'
						}}
						>
						<h3>Spacing Details</h3>
						</div>

						<div>
						<p 
							style={{ 
								padding: '20px',
								
							}}>
							Note: Representative image for Spacing Details -3 x 3  pattern considered </p>
							{/* <Input
								className='btn'
								type="button"
								value={"Close"}
								onClick={() => setSpacingModel(false)}
								style={{
									maxWidth: '10vh',
									maxHight: 'vh',
									marginLeft: "50vh"
								}}
								/> */}
						</div>
						<div className='spacing-main-body'>
							<div className='spacing-left-body'>
								<div>
									<h4>Pitch Distance (mm)</h4>
								</div>
								<div>
									<Input
										type="text"
										style={{ color: 'rgb(0 0 0 / 67%)', fontSize: '12px', fontWeight: '500' }}
										readOnly={true}
										value= {(output && output.Bolt && output?.Bolt[output?.Bolt.findIndex(val => val.label == "Pitch Distance (mm)")]?.val) || "0"}
									/>
								</div>
								<div>
									<h4>End Distance (mm)</h4>
								</div>
								<div>
									<Input
										type="text"
										style={{ color: 'rgb(0 0 0 / 67%)', fontSize: '12px', fontWeight: '500' }}
										readOnly={true}
										value= {(output && output.Bolt && output?.Bolt[output?.Bolt.findIndex(val => val.label == "End Distance (mm)")]?.val) || "0"}
									/>
								</div>
								<div>
									<h4>Gauge Distance (mm)</h4>
								</div>
								<div>
									<Input
										type="text"
										style={{ color: 'rgb(0 0 0 / 67%)', fontSize: '12px', fontWeight: '500' }}
										readOnly={true}
										value= {(output && output.Bolt && output?.Bolt[output?.Bolt.findIndex(val => val.label == "Gauge Distance (mm)")]?.val) || "0"}
									/>
								</div>
								<div>
									<h4>Edge Distance (mm)</h4>
								</div>
								<div>
									<Input
										type="text"
										style={{ color: 'rgb(0 0 0 / 67%)', fontSize: '12px', fontWeight: '500' }}
										readOnly={true}
										value= {(output && output.Bolt && output?.Bolt[output?.Bolt.findIndex(val => val.label == "Edge Distance (mm)")]?.val) || "0"}
									/>
								</div>


							
							</div>
							<div className='spacing-right-body'> 
								<img src={spacingIMG} alt='SpacingImage' width="400" height="300"/>
							</div>

						</div>
{/*  */}
					</>
				</Modal>
		</div>
	)
}

export default EndPlateOutputDock